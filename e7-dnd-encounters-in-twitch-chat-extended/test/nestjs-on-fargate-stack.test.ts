import {
  expect as expectCDK,
  MatchStyle,
  matchTemplate,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import { NestjsOnFargateStack } from "../lib/nestjs-on-fargate-stack";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new NestjsOnFargateStack(
    app,
    "MyTestStack",
    // @ts-ignore TODO test
    {}
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
