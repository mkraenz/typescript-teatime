import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import * as cdk from "@aws-cdk/core";

export class NestjsToAwsFargateWithAwsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "MyFargateService",
      {
        publicLoadBalancer: true,
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset("./hellonest"),
          containerName: "HelloNest",
          containerPort: 3000,
        },
      }
    );
  }
}
