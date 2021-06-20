# Learning

- [x] AWS CDK App
- [x] Nestjs App inside
- [x] Dockerize nestjs app
- [x] Deploy container to AWS Fargate
- [x] Change some code to have a hitcounter and return the count
- [x] receive POST request
- [x] see logs in cloudwatch
- [x] setup AWS DocumentDB with CDK
- [x] NestJS app with MongoDB / Mongoose locally
- [x] NestJS app connects to AWS DocumentDB

Test scenario

Given a Nestjs App with endpoint `/`
When I ping the endpoint on the Internet
Then I get the result HTTP 200 and body 'hello'

## Welcome to your CDK TypeScript project

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
