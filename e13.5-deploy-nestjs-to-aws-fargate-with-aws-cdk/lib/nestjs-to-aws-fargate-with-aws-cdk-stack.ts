import { DatabaseCluster } from "@aws-cdk/aws-docdb";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import * as cdk from "@aws-cdk/core";
import { RemovalPolicy } from "@aws-cdk/core";
import * as dotenv from "dotenv";

dotenv.config({ path: "./lib/.env" });

export class NestjsToAwsFargateWithAwsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const env = process.env;
    assertEnv(env);

    const vpc = new ec2.Vpc(this, "vpc", { maxAzs: 2 });
    const cluster = new ecs.Cluster(this, "cluster", { vpc });
    const db = new DatabaseCluster(this, "db", {
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MEDIUM
      ),
      removalPolicy: RemovalPolicy.DESTROY,
      masterUser: {
        username: env.DATABASE_MASTER_USERNAME,
      },
    });
    // DONT DO IN PRODUCTION. production should probably call aws_secretmanager from within application code
    const pw = db.secret?.secretValue.toString();

    const databaseUrl = `mongodb://${env.DATABASE_MASTER_USERNAME}:${pw}${db.clusterEndpoint.socketAddress}/?replicaSet=rs0&ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem`;
    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "MyFargateService",
      {
        cluster,
        publicLoadBalancer: true,
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset("./hellonest"),
          containerName: "HelloNest",
          containerPort: 3000,
          environment: {
            DATABASE_URL: databaseUrl,
            DATABASE_USE_TLS: "true",
          },
        },
      }
    );
  }
}
interface Env {
  DATABASE_MASTER_USERNAME?: string;
}

function assertEnv(env: Env): asserts env is Required<Env> {
  if (!env.DATABASE_MASTER_USERNAME)
    throw new Error("Missing DATABASE_MASTER_USERNAME");
}
