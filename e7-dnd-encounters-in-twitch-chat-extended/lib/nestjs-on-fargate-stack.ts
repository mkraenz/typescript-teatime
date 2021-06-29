import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import { ISecret } from "@aws-cdk/aws-secretsmanager";
import * as cdk from "@aws-cdk/core";
import type { Env } from "../server/src/env";

type Props = {
  vpc: ec2.Vpc;
  databaseSecret: ISecret;
} & cdk.StackProps;

type Dictionary = { [key: string]: string };

export class NestjsOnFargateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: Props) {
    super(scope, id, props);

    const cluster = new ecs.Cluster(this, "cluster", { vpc: props.vpc });

    const teawarsEnv: Env = {
      DATABASE_USE_TLS: "true",
    };
    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "TeawarsFargateService",
      {
        cluster,
        publicLoadBalancer: true,
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset("./server"),
          containerName: "TeaWarsServer",
          containerPort: 3000,
          environment: teawarsEnv as Dictionary,
          secrets: {
            DATABASE_AWS_SECRET: {
              grantRead: props.databaseSecret.grantRead.bind(
                props.databaseSecret
              ),
              arn: props.databaseSecret.secretArn,
            },
          },
        },
      }
    );
  }
}
