import {
  expect as expectCDK,
  MatchStyle,
  matchTemplate,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as E135DeployNestjsToAwsFargateWithAwsCdk from "../lib/nestjs-to-aws-fargate-with-aws-cdk-stack";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack =
    new E135DeployNestjsToAwsFargateWithAwsCdk.NestjsToAwsFargateWithAwsCdkStack(
      app,
      "MyTestStack"
    );
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});
