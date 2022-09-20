# Deep Dive: Build a Serverless Mailchimp Clone with AWS Step Functions and Amazon Simple Email Service - Part 3 - Should Send Newsletter Lambda

## Choosing the right tool

Requirements

- write TypeScript not JavaScript
- need to use node_modules -> upload a zip file to Lambda
- should be comfortable to use

Options

- custom setup -> sounds like work...
- Serverless Framework -> third-party dependency I'd like to avoid for this blog article
- use something AWS provides -> AWS Server Application Model (SAM) CLI

## Prerequisites

- CLI for AWS Serverless Application Model (SAM) installed
  - I use version `1.56.1`
- Node v16 installed
  - I use version `16.16.0`

```sh
### https://aws.amazon.com/blogs/compute/building-typescript-projects-with-aws-sam-cli/
sam init
```

```log
❯ sam init

You can preselect a particular runtime or package type when using the `sam init` experience.
Call `sam init --help` to learn more.

Which template source would you like to use?
        1 - AWS Quick Start Templates
        2 - Custom Template Location
Choice: 1

Choose an AWS Quick Start application template
        1 - Hello World Example
        2 - Multi-step workflow
        3 - Serverless API
        4 - Scheduled task
        5 - Standalone function
        6 - Data processing
        7 - Infrastructure event management
        8 - Lambda EFS example
        9 - Machine Learning
Template: 1

Use the most popular runtime and package type? (Python and zip) [y/N]:

Which runtime would you like to use?
        1 - dotnet6
        2 - dotnet5.0
        3 - dotnetcore3.1
        4 - go1.x
        5 - graalvm.java11 (provided.al2)
        6 - graalvm.java17 (provided.al2)
        7 - java11
        8 - java8.al2
        9 - java8
        10 - nodejs16.x
        11 - nodejs14.x
        12 - nodejs12.x
        13 - python3.9
        14 - python3.8
        15 - python3.7
        16 - python3.6
        17 - ruby2.7
        18 - rust (provided.al2)
Runtime: 10

What package type would you like to use?
        1 - Zip
        2 - Image
Package type: 1

Based on your selections, the only dependency manager available is npm.
We will proceed copying the template using npm.

Select your starter template
        1 - Hello World Example
        2 - Hello World Example TypeScript
Template: 2

Would you like to enable X-Ray tracing on the function(s) in your application?  [y/N]:

Project name [sam-app]: should-send-newsletter

Cloning from https://github.com/aws/aws-sam-cli-app-templates (process may take a moment)

    -----------------------
    Generating application:
    -----------------------
    Name: should-send-newsletter
    Runtime: nodejs16.x
    Architectures: x86_64
    Dependency Manager: npm
    Application Template: hello-world-typescript
    Output Directory: .

    Next steps can be found in the README file at ./should-send-newsletter/README.md


    Commands you can use next
    =========================
    [*] Create pipeline: cd should-send-newsletter && sam pipeline init --bootstrap
    [*] Validate SAM template: sam validate
    [*] Test Function in the Cloud: sam sync --stack-name {stack-name} --watch
```

## References

- <https://dev.to/rss>
- <https://aws.amazon.com/blogs/compute/building-typescript-projects-with-aws-sam-cli/>
- <https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started-hello-world.html>
- <https://docs.aws.amazon.com/step-functions/latest/dg/concepts-sam-sfn.html>
- <https://docs.aws.amazon.com/step-functions/latest/dg/tutorial-state-machine-using-sam.html>
- <https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-statemachine.html>
- <https://github.com/aws/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessfunction>
