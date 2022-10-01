# Serverless Mailchimp Clone with AWS Step Functions, SAM, Lambda, SES, DynamoDB, and API Gateway

[AWS SAM](https://aws.amazon.com/serverless/sam/) project to deploy a serverless email newsletter service to AWS featuring

- `POST /subscribe` route to subscribe to the newsletter.
- `GET /confirm?token=12345` route to confirm subscription (Double Opt-In)
- `GET /unsubscribe?id=<id>}` route to unsubscribe from the newsletter. Included in the footer of any email send to each user. `GET` because emails do not support `POST`. The id is user-specific.
- scheduled call at 4AM UTC every day of `NewsletterSfn` - the Step Function that checks for new blog posts using RSS feed of the blog, and, if a new blog post exists, sends the newsletter to all subscribers.

Included source code and supporting files are

- `template.yaml` - **most important**. SAM template that defines the application's AWS resources.
- `state-machines/` - containing all the Step Functions state machine definitions
- `has-new-blog-article/` - folder containing the Lambda function to check if there is a new blog article using RSS feed of the blog, e.g. [dev.to/rss](https://dev.to/rss)
- `chunk-contacts/` - folder containing the Lambda function to chunk the contacts into batches of 50 because SES `SendBulkEmail` API can only send 50 emails at a time
- `transform-to-send-bulk-email/` - folder containing the Lambda function to transform the contacts into the format required by SES `SendBulkEmail` API

All AWS resources are defined in the `template.yaml` file. You can update the template to add AWS resources through the same deployment process that updates your application code.

This project was bootstrapped using [AWS SAM CLI hello-world template for TypeScript](https://aws.amazon.com/blogs/compute/building-typescript-projects-with-aws-sam-cli/) with `sam init`.

## Most important commands

Changing AWS resources

```sh
sam validate
sam build # builds everything (inluding Lambda functions to JavaScript)
sam deploy --guided # first time
sam deploy # any other time
```

Changing Lambda functions

```sh
cd ./<directory of lambda function>
npm ci # install dependencies using lock file
tsc --noEmit # type check (compilation is done by sam build)
# then deploy from repository root using sam cli
```

Destroy everything (use with caution!)

```sh
sam delete
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready to use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)
