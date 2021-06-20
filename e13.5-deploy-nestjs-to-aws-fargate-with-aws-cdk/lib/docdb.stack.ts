import { DatabaseCluster } from "@aws-cdk/aws-docdb";
import * as ec2 from "@aws-cdk/aws-ec2";
import { Construct, RemovalPolicy, Stack, StackProps } from "@aws-cdk/core";

type Props = StackProps & {
  databaseMasterUsername: string;
  databaseMasterPassword: string;
};

export class HellonestDocDb extends Stack {
  public readonly databaseUsername: string;
  public readonly databasePassword: string;
  /** HOSTNAME:PORT */
  public readonly databaseUrl: string;
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, "vpc", { maxAzs: 2 });
    const db = new DatabaseCluster(this, "db", {
      vpc: this.vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MEDIUM
      ),
      removalPolicy: RemovalPolicy.DESTROY,
      masterUser: {
        username: props.databaseMasterUsername,
        // password: new SecretValue(props.databaseMasterPassword),
      },
    });

    this.databaseUsername = props.databaseMasterUsername;
    this.databaseUrl = db.clusterEndpoint.socketAddress;
  }
}
