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
- [x] Security Group to allow access to DocDb from within the VPC
- [ ] NestJS app receives db credentials from Secret Manager

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

## How to deploy Debug EC2 Instance for Access to DocumentDB

```bash
yarn deploy HelloNestDebuggerStack
# confirm changes
# After successful deploy, scroll up to see the command to download the private key to use for ssh.
```

Next, follow the steps from [Connect to DocDB from outside the VPC](https://docs.aws.amazon.com/documentdb/latest/developerguide/connect-from-outside-a-vpc.html?sc_channel=sm&sc_campaign=Support&sc_publisher=TWITTER&sc_country=Global&sc_geo=GLOBAL&sc_outcome=AWS%20Support&trk=Support_TWITTER&sc_content=Support)

### Cleanup

If needed, the keypair can be manually deleted with

```bash
aws secretsmanager delete-secret --secret-id ec2-ssh-key/ec2-debugger-keypair/private --force-delete-without-recovery --profile typescriptteatime
```

### Install Mongodb Shell on the EC2 instance

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org-shell
```

## Resources

- [Blog Url Shortener with DocDb and CDK](https://medium.com/tysonworks/create-and-deploy-simple-url-shortener-with-aws-cdk-and-documentdb-875ab99d51f5)
- [CDK DocDb Construct lib](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-docdb-readme.html)
- [Connect to DocDB from outside the VPC](https://docs.aws.amazon.com/documentdb/latest/developerguide/connect-from-outside-a-vpc.html?sc_channel=sm&sc_campaign=Support&sc_publisher=TWITTER&sc_country=Global&sc_geo=GLOBAL&sc_outcome=AWS%20Support&trk=Support_TWITTER&sc_content=Support)
- [Secret Manager with Fargate](https://aws.amazon.com/de/blogs/compute/securing-credentials-using-aws-secrets-manager-with-aws-fargate/)
- [Install MongoDB shell without server](https://askubuntu.com/questions/1127055/install-mongodb-shell-client-without-server)
