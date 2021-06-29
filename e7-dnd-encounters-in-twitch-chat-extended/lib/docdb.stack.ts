import { DatabaseCluster } from "@aws-cdk/aws-docdb";
import * as ec2 from "@aws-cdk/aws-ec2";
import { Construct, RemovalPolicy, Stack, StackProps } from "@aws-cdk/core";

type Props = StackProps & {
  databaseMasterUsername: string;
};

export class DocDb extends Stack {
  public readonly databaseUsername: string;
  /** HOSTNAME:PORT */
  public readonly databaseUrl: string;
  public readonly vpc: ec2.Vpc;
  public readonly databaseSecret: NonNullable<DatabaseCluster["secret"]>;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, "vpc", { maxAzs: 2 });
    const securityGroup = new ec2.SecurityGroup(this, "docdb-sg", {
      vpc: this.vpc,
      description: "HelloNest DocumentDB securityGroup",
    });
    const port = 27017;
    const db = new DatabaseCluster(this, "db", {
      vpc: this.vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MEDIUM
      ),
      removalPolicy: RemovalPolicy.DESTROY,
      masterUser: {
        username: props.databaseMasterUsername,
      },
      securityGroup,
      port,
    });
    securityGroup.addIngressRule(
      ec2.Peer.ipv4(this.vpc.vpcCidrBlock),
      ec2.Port.tcp(port)
    );

    db.addRotationSingleUser(); // auto rotate credentials after 30 days
    this.databaseSecret = db.secret!;
    this.databaseUsername = props.databaseMasterUsername;
    this.databaseUrl = db.clusterEndpoint.socketAddress;
  }
}
