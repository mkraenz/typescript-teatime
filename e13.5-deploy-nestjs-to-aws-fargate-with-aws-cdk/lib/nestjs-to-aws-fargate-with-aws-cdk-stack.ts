import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import * as cdk from "@aws-cdk/core";
import type { Env } from "../hellonest/src/env";

type Props = {
  vpc: ec2.Vpc;
  /** `HOSTNAME:PORT` */
  databaseUrl: string;
  databaseCredentials: {
    username: string;
    password: string;
  };
} & cdk.StackProps;

export class NestjsToAwsFargateWithAwsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: Props) {
    super(scope, id, props);

    const cluster = new ecs.Cluster(this, "cluster", { vpc: props.vpc });

    const hellonestEnv: Env = {
      DATABASE_URL: props.databaseUrl,
      DATABASE_USE_TLS: "true",
      DATABASE_PASSWORD: props.databaseCredentials.password,
      DATABASE_USERNAME: props.databaseCredentials.username,
    };
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
          environment: { ...hellonestEnv },
        },
      }
    );
  }
}
