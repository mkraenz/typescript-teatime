import * as ec2 from "@aws-cdk/aws-ec2";
import { InstanceClass, InstanceType, Port } from "@aws-cdk/aws-ec2";
import { CfnOutput, Construct, Stack, StackProps } from "@aws-cdk/core";
import { KeyPair } from "cdk-ec2-key-pair";

type Props = StackProps & {
  vpc: ec2.Vpc;
  env: {
    region: string;
  };
  keyPairName?: string;
  /** The (typically-VPC internal) URL to connect to (including port) */
  sshForwardTargetUrl?: string;
  sshForwardLocalPort?: string;
  profile: string;
};

export class DebuggerStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const keyPairName = props.keyPairName || "ec2-debugger-keypair";
    const key = new KeyPair(this, "ec2-debugger-keypair", {
      name: keyPairName,
      description: "For debugging from within the DocumentDB VPC",
      storePublicKey: true, // by default the public key will not be stored in Secrets Manager
      removeKeySecretsAfterDays: 0,
      exposePublicKey: true,
    });

    const rootUser = "ubuntu";
    const ami = ec2.MachineImage.genericLinux({
      ["eu-west-1"]: "ami-0a8e758f5e873d1c1", // ubuntu 20, free tier eligable
    });
    const instance = new ec2.Instance(this, "debugger", {
      vpc: props.vpc,
      machineImage: ami,
      instanceType: InstanceType.of(InstanceClass.T2, ec2.InstanceSize.MICRO),
      keyName: key.keyPairName,
      vpcSubnets: { subnets: props.vpc.publicSubnets },
    });
    instance.connections.allowFromAnyIpv4(
      Port.tcp(22),
      "allow ssh access from the world"
    );

    new CfnOutput(this, "ec2-debugger-public-dns", {
      value: instance.instancePublicDnsName,
      description:
        "The Public DNS name of the EC2 Instance for debugging DocumentDB",
    });

    const sshCommand = `ssh -i "ec2-debugger-keypair.pem" ${rootUser}@${instance.instancePublicDnsName}`;
    new CfnOutput(this, "ec2-debugger-ssh-login-initial", {
      value: `aws secretsmanager get-secret-value --secret-id ec2-ssh-key/${keyPairName}/private --query SecretString --output text --profile ${props.profile} > ec2-debugger-keypair.pem && chmod 600 ec2-debugger-keypair.pem && ${sshCommand}`,
      description:
        "Initial Command to SSH-dive into the EC2 Instance for debugging DocumentDB. Includes initial setup",
    });
    new CfnOutput(this, "ec2-debugger-ssh-login", {
      value: sshCommand,
      description:
        "Command to SSH-dive into the EC2 Instance for debugging DocumentDB. Requires intial setup",
    });
    if (props.sshForwardTargetUrl) {
      new CfnOutput(this, "ec2-debugger-ssh-lokal-port-forwarding", {
        value: `${sshCommand} -L ${props.sshForwardLocalPort}:${props.sshForwardTargetUrl} -N`,
        description: `Command to SSH-forward local port ${props.sshForwardLocalPort} to the target via this EC2 Instance. Useful for debugging. Requires intial setup`,
      });
    }
  }
}
