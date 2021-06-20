#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import * as dotenv from "dotenv";
import "source-map-support/register";
import { HellonestDocDb } from "../lib/docdb.stack";
import { NestjsToAwsFargateWithAwsCdkStack } from "../lib/nestjs-to-aws-fargate-with-aws-cdk-stack";

dotenv.config({ path: "./lib/.env" }); // path is relative to where `cdk deploy` is run
const env = process.env;
assertEnv(env);

const app = new cdk.App();

const dbStack = new HellonestDocDb(app, "HellonestDocDbStack", {
  databaseMasterUsername: env.DATABASE_MASTER_USERNAME,
  databaseMasterPassword: env.DATABASE_MASTER_PASSWORD,
});
new NestjsToAwsFargateWithAwsCdkStack(app, "HelloNestStack", {
  vpc: dbStack.vpc,
  databaseCredentials: {
    username: env.DATABASE_MASTER_USERNAME,
    password: env.DATABASE_MASTER_PASSWORD,
    // username: dbStack.databaseUsername,
    // password: dbStack.databasePassword,
  },
  databaseUrl: dbStack.databaseUrl,
});

interface Env {
  DATABASE_MASTER_USERNAME?: string;
  DATABASE_MASTER_PASSWORD?: string;
}

function assertEnv(env: Env): asserts env is Required<Env> {
  if (!env.DATABASE_MASTER_USERNAME)
    throw new Error("Missing DATABASE_MASTER_USERNAME");
  if (!env.DATABASE_MASTER_PASSWORD)
    throw new Error("Missing DATABSE_MASTER_PASSWORD");
}
