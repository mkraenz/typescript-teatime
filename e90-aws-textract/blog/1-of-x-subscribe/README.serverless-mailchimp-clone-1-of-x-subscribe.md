# Deep Dive: Build a Serverless Mailchimp Clone with AWS Step Functions and Amazon Simple Email Service - Part 1 - Subscribe endpoint

Today, we learn how to set up AWS Step Functions, integrating with Amazon Simple Email Service and AWS API Gateway, setting minimal permissions via AWS IAM - all from the AWS CLI for reproducability - in order to build a subscribe endpoint for an email newsletter. I will also include how to verify that everything works, as well as pitfalls and troubleshooting tips.

We will create the `POST /subscribe` endpoint for an email newsletter service hosted on API Gateway. On a new subscriber's HTTP request, we trigger a subscription workflow, in our case, saving the new contact and sending a welcome email. The workflow is modeled using a Step Functions state machine. Managing contacts and sending email is handled via Simple Email Service.

To do this, we first setup Simple Email Service and get comfortable using it. Then, we build the workflow with Step Functions including setting up permissions. Finally, we setup the `POST /subscribe` endpoint on API Gateway, link it to Step Functions using an Integration, and again, set up permissions. As a bonus, we enable CORS on our new API so that the blog can make an http post request to subscribe the reader using JavaScript.

A GitHub repository with the full example code can be found at TODO.

## Contents

- [Deep Dive: Build a Serverless Mailchimp Clone with AWS Step Functions and Amazon Simple Email Service - Part 1 - Subscribe endpoint](#deep-dive-build-a-serverless-mailchimp-clone-with-aws-step-functions-and-amazon-simple-email-service---part-1---subscribe-endpoint)
  - [Contents](#contents)
  - [Target Workflow](#target-workflow)
  - [Motivation](#motivation)
  - [Pricing - tl;dr free](#pricing---tldr-free)
  - [Prerequisites](#prerequisites)
  - [Setup Simple Email Service (SES)](#setup-simple-email-service-ses)
    - [Create an Identity and Verify](#create-an-identity-and-verify)
    - [Create the Welcome Email Template](#create-the-welcome-email-template)
    - [Test Render the Welcome Email](#test-render-the-welcome-email)
    - [Send Your First Templated Email](#send-your-first-templated-email)
      - [Troubleshooting](#troubleshooting)
      - [Congratz on Sending Your First Email](#congratz-on-sending-your-first-email)
    - [Create a Contact List](#create-a-contact-list)
  - [Build the Subscribe-to-Newsletter Workflow with Step Functions](#build-the-subscribe-to-newsletter-workflow-with-step-functions)
    - [Create the Execution Role for Step Functions](#create-the-execution-role-for-step-functions)
    - [Create the Step Functions State Machine](#create-the-step-functions-state-machine)
    - [Validate the workflow](#validate-the-workflow)
      - [Troubleshooting your State Machine](#troubleshooting-your-state-machine)
  - [Setup API Gateway and invoke your subscribe workflow via HTTP](#setup-api-gateway-and-invoke-your-subscribe-workflow-via-http)
    - [Create API Gateway API](#create-api-gateway-api)
    - [Create a route and call the Step Functions state machine](#create-a-route-and-call-the-step-functions-state-machine)
    - [Test your Subscription API](#test-your-subscription-api)
    - [Bonus: Setup CORS](#bonus-setup-cors)
  - [Next Steps](#next-steps)
  - [Closing](#closing)
  - [References](#references)
  <!-- TODO generate -->

## Target Workflow

<!-- TODO update image with newest version (no dynamodb) -->

![Step Functions Graph for Subscription Workflow](./subscribe_stepfunctions_graph.svg)

<!-- <img src="./subscribe_stepfunctions_graph.svg" alt="Step Functions Graph for Subscription Workflow"> -->

This workflow is going to be triggered by the following HTTP request:

```http
POST YOUR_AWS_API_GATEWAY_URL/subscribe
Content-Type: application/json

{
  "email": "hello@example.com"
}
```

## Motivation

A little while ago, a good friend of mine said she wanted to add an email newsletter to her blog to stay in contact with her readers. Whenever she publishes a new blog article, an email should be sent to her newsletter subscribers informing them about the new article and inviting them to read the article on her blog.

Since she still has a fairly small followership she does't want to pay the monthly fee for services like [MailChimp](https://mailchimp.com/) yet. On the other hand, the free tier of Mailchimp only allows to send emails with the MailChimp logo in the footer - which doesn't look too great.

Fitting my objective of getting deeper into Serverless Computing, particularly AWS Step Functions, I decided to build this in our Twitch stream, the [TypeScriptTeatime](https://www.twitch.tv/typescriptteatime).

Why serverless? Serverless Computing provides us with the benefit that as long as usage is low, we have close-to-zero operative costs. Further, the approach is future proof as our infrastructure will automatically scale to large numbers of users without any further work needed. Step Functions is very useful in making our workflow visible which helps in communication. Be aware though that there is an important disadvantage to our approach - there is no visual editor to build the email templates.

## Pricing - tl;dr free

<!-- TODO SES is not free https://aws.amazon.com/ses/pricing/ -->

AWS provides you with [a generous free tier](https://aws.amazon.com/free/) for the first 12 month. Moreover, AWS Step Functions and Amazon Simple Email Service (SES), the services we will be using today, stay free forever up to some thresholds, and AWS IAM is completely free. Even if you are past the 12 month, building and operating this for a few hundred email subscribers should cost you less than one dollar over several months.

## Prerequisites

- AWS account. If you don't have an account yet, you can create one here via the [AWS website](https://aws.amazon.com/).
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) installed and configured (I tested this with `aws-cli/2.7.31 Python/3.9.11` on Ubuntu Linux)
<!-- - (TODO test with `PowerUserAccess`) -->
- Access permissions on your user (I tested with `AdministratorAccess` policy but `PowerUserAccess` might suffice)
- default profile and default region set in your AWS CLI config

If you don't want to setup default profile and region, you can pass the `--profile YOUR_PROFILE` and `--region YOUR_REGION` flags to each of the AWS CLI commands. But it's definitely more comfortable to use defaults.

## Setup Simple Email Service (SES)

We want to send email notifications to our subscribers whenever there is a new blog post. We will use [AWS Simple Email Service](https://aws.amazon.com/ses/) (SES) to do this.

SES a service that allows you to send emails, manage mailing list, create email template, send those template emails, and more.

### Create an Identity and Verify

First, we need to create an identity to send emails from.
This can either be an email, or a domain you own.
For the sake of simplicity, we use an email address in this article.

> You must use an email address for which you have email inbox access.

This is because SES will send a verification email to this address to verify that you own this email address.
SES does this to stop spammers and other malicious intents.

You can use a fake email like temp-mail, but remember to clear the domain after you are done with this tutorial for safeties' sake.

```sh
aws sesv2 create-email-identity --email-identity YOUR_EMAIL_ADDRESS
```

Example:

```sh
aws sesv2 create-email-identity --email-identity 'hello@example.com'
```

Once you've ran the command, you should find an email in your inbox from AWS within a few minutes. Click on the link to verify the email address.

> Note: Without further setup. you will be in **SES Sandbox Mode**, meaning that you can only send emails to verified email addresses (i.e. identities), or the [SES Mailbox Simulator](https://docs.aws.amazon.com/ses/latest/dg/send-an-email-from-console.html#send-email-simulator). To get into production mode, check these [docs](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html). For production, you should further setup proper authentication with SPK and email signing with DKIM. More on that can be found [here](https://docs.aws.amazon.com/ses/latest/dg/tips-and-best-practices.html#authentication-considerations:~:text=in%20their%20feedback.-,Authentication,-Authenticate%20your%20domain).

### Create the Welcome Email Template

We will be using the command [create-email-template](https://docs.aws.amazon.com/cli/latest/reference/sesv2/create-email-template.html) command with the `--cli-input-json` flag to pass the template as a JSON file. This is much easier than having to format and escape everything correctly for direct CLI input. To learn more about the flag, see [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-skeleton.html).

Anyway, let's create the input JSON file `welcome.create-email-template.input.json`:

```json
{
  "TemplateName": "EmailNewsletterWelcome",
  "TemplateContent": {
    "Subject": "Welcome to the Newsletter",
    "Text": "Welcome to the Newsletter. You will receive a new email whenever there is a new blog post.",
    "Html": "<h1>Welcome to the Newsletter</h1><p>Hi {{email}},</><p>You will receive a new email whenever there is a new blog post.</p>"
  }
}
```

If you wonder what the `Text` property is about that is for subscribers whos email client doesn't support rendering HTML, for example older versions of Outlook.

The `{{email}}` is a placeholder that will be replaced with the actual email address when the email is sent, assuming we provide the proper template variables a.k.a. template data. In a more complex setup, you will likely have placeholders for the name of the subscriber, or other information.

Continuing on, we can now create the template with:

```sh
aws sesv2 create-email-template --cli-input-json file://welcome.create-email-template.input.json
```

### Test Render the Welcome Email

To ensure the bare minimum of the email works, you can render a preview with [test-render-email-template](https://docs.aws.amazon.com/cli/latest/reference/sesv2/test-render-email-template.html) endpoint.

```sh
aws sesv2 test-render-email-template \
  --template-name EmailNewsletterWelcome \
  --template-data '{"email":"hello@example.com"}'
```

`--template-data` is a _stringified JSON_ that contains the data to render the template with. These are the template variables that will replace the corresponding `{{email}}` placeholder in the template. Depending on your template, there might be more template variables required like a `name` property.

Troubleshooting: If you run into errors during rendering, make sure you provide all template variables, and that you properly escape your stringified JSON for the `--template-data`. For fixing the template itself, you can use the command[update-email-template](https://docs.aws.amazon.com/cli/latest/reference/sesv2/update-email-template.html).

### Send Your First Templated Email

To send an actual email, you can use the [send-email](https://docs.aws.amazon.com/cli/latest/reference/ses/send-email.html) command.

Let's create the input JSON file `send-email.input.json`. Be sure to replace `YOUR_SENDER_EMAIL_ADDRESS`, `YOUR_DESTINATION_EMAIL_ADDRESS`, `YOUR_REGION`, and `YOUR_ACCOUNT_ID`

```json
{
  "FromEmailAddress": "YOUR_SENDER_EMAIL_ADDRESS",
  "Destination": {
    "ToAddresses": ["YOUR_DESTINATION_EMAIL_ADDRESS"]
  },
  "Template": {
    "TemplateName": "EmailNewsletterWelcome",
    "TemplateArn": "arn:aws:ses:YOUR_REGION:YOUR_ACCOUNT_ID:template/EmailNewsletterWelcome",
    "TemplateData": "{\"email\":\"YOUR_DESTINATION_EMAIL_ADDRESS\"}"
  }
}
```

For example,

```json
{
  "FromEmailAddress": "hello@example.com",
  "Destination": {
    "ToAddresses": ["subscriber@example.com"]
  },
  "Template": {
    "TemplateName": "EmailNewsletterWelcome",
    "TemplateArn": "arn:aws:ses:us-east-1:12345689012:template/EmailNewsletterWelcome",
    "TemplateData": "{\"email\":\"subscriber@example.com\"}"
  }
}
```

Finally, send the email with:

```sh
aws sesv2 send-email --cli-input-json file://send-email.input.json
```

The command response should be a JSON containing a message id property. This indicates success from AWS SES. Check your inbox to see if the email has arrived.
It should look something like this:

<!-- TODO add image from receiving inbox -->

If it does not arrive after a few minutes, continue to the following Troubleshooting section.

#### Troubleshooting

There are some pitfalls to sending an email while you are in the SES Sandbox mode. Most importantly,

> You can only send to verified email addresses (i.e. identities).

Other than that, if you use a Gmail address as sender and try to send to the same email, it unfortunately will never appear in your Gmail inbox even though Amazon SES reports success. Gmail seems to block such attempts away silently.
Other email providers might do the same.
You can work around this by creating another identity with, for example, [temp mail](https://temp-mail.org/en/), verify it, and send to that email address using the Gmail address as sender.

If that still does not help, login to the AWS Console (i.e. the web UI), navigate to the SES service, and go to `Account Dashboard`.
Make sure you are in the correct region!
Scroll down until you find a button `View in Cloud Watch`. Follow the link to head over to AWS' log management service Cloud Watch.
You will be placed on the `Graphed Metrics` tab but you want to go to the `Browse` tab. Here, mark all possible metrics (Delivery, RenderingFailure, etc) to see what happened to your email up in the graph.
From what it looks like, Cloud Watch receives new SES data only once per hour. So you might need to wait an hour or two to see what happened to your email.

#### Congratz on Sending Your First Email

🎉 Congratulations! 🥳 That's it for the basic email template setup. For many use-cases this might already be all you need. For our use-case, however, we want to send emails to our subscribers whenever there is a new blog post. So, we first need to setup a way to manage our subscribers. We will be using Contact Lists for this.

### Create a Contact List

A contact list is a list of email addresses that you want to send emails to. In our case, it will these will be our newsletter subscribers.

To create a contact list, first, create a json file `create-contact-list.input.json` with the following content:

```json
{
  "ContactListName": "EmailNewsletter",
  "Description": "Creating a contact list example",
  "Topics": [
    {
      "TopicName": "Newsletter",
      "DisplayName": "Blog Post Newsletter",
      "Description": "Never miss a new blog post by subscribing to our newsletter.",
      "DefaultSubscriptionStatus": "OPT_OUT"
    }
  ]
}
```

Then, create the contact list with [create-contact-list](https://docs.aws.amazon.com/cli/latest/reference/sesv2/create-contact-list.html):

```sh
aws sesv2 create-contact-list --cli-input-json file://create-contact-list.input.json
```

Let's validate that everything was setup successfully by creating a new contact. Remember to replace `YOUR_CONTACTS_EMAIL_ADDRESS` in the [create-contact](https://docs.aws.amazon.com/cli/latest/reference/sesv2/create-contact.html) command.

```sh
aws sesv2 create-contact --contact-list-name "EmailNewsletter" --email-address "YOUR_CONTACTS_EMAIL_ADDRESS"
```

For example,

```sh
aws sesv2 create-contact --contact-list-name "EmailNewsletter" --email-address "hello@example.com"
```

Next, we list all contacts that are subscribed to our newsletter with [list-contacts](https://docs.aws.amazon.com/cli/latest/reference/sesv2/list-contacts.html).

```sh
aws sesv2 list-contacts --contact-list-name "EmailNewsletter"
```

If your output looks similar to the following, everything has worked.

```json
{
  "Contacts": [
    {
      "EmailAddress": "hello@example.com",
      "TopicDefaultPreferences": [
        {
          "TopicName": "Newsletter",
          "SubscriptionStatus": "OPT_OUT"
        }
      ],
      "UnsubscribeAll": false,
      "LastUpdatedTimestamp": "2022-09-15T13:00:00.000000+00:00"
    }
  ]
}
```

Let's clean up the contacts by deleting the contact we just created with [delete-contact](https://docs.aws.amazon.com/cli/latest/reference/sesv2/delete-contact.html).

```sh
CONTACTS_EMAIL_ADDRESS="YOUR_CONTACTS_EMAIL_ADDRESS"
aws sesv2 delete-contact --contact-list-name "EmailNewsletter" --email-address $CONTACTS_EMAIL_ADDRESS
```

Congratulations! Let's dive into connecting these commands using a AWS Step Functions state machine.

## Build the Subscribe-to-Newsletter Workflow with Step Functions

We will now get into modeling the actual workflow that uses the SES api calls to, first, save a new subscriber as a new contact, and second, send a welcome email to this new subscriber. Step Functions uses the term _state machine_ to refer to the workflow because it models business workflows as state machines, that is, a set of _states_ (for example, api calls to other AWS services, if-else statements, or data transformations) and _transitions_ between states (how to go from one state to the next state, and what data to pass on).

Unfortunately, since we are only using the AWS CLI here, we first have to create an IAM role that has exactly the permissions to create an email contact in SES, and send the welcome email via SES. We will also include X-Ray permissions to allow Step Functions to render the nice state machine live view and debugging in the AWS Console. The latter would automatically be included if you use the AWS Step Functions UI to create the state machine with the `Create new role` option selected. Step Functions can create a lot of permissions automatically. Unfortunately, it doesn't do this for SES. So we have to do it ourselves. At least, the Step Functions UI would warn us that we have to do this manually, including which permissions exactly.

### Create the Execution Role for Step Functions

First create a JSON that contains the permissions, and a JSON for the trust policy. We then use the CLI to create the role, and finally attach the permissions to the new role.

So let's create a file `stepfunctions-newsletter-subscribe.policy.json` with the following content.

> **Be sure to replace `YOUR_ACCOUNT_ID` and `YOUR_REGION` in the JSON.**

Note that we reuse the template name `EmailNewsletterWelcome`, contact list `EmailNewsletter`, and the SES configuration set `NewsletterConfigSet` that we've created earlier. If you've changed any of the names in a previous step, be sure to adjust these values, too.

<!-- TODO do I need the config set? currently we do not create it -->

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ses:SendTemplatedEmail",
      "Resource": [
        "arn:aws:ses:YOUR_REGION:YOUR_ACCOUNT_ID:configuration-set/*NewsletterConfigSet*",
        "arn:aws:ses:*:YOUR_ACCOUNT_ID:identity/*",
        "arn:aws:ses:YOUR_REGION:YOUR_ACCOUNT_ID:template/EmailNewsletterWelcome"
      ]
    },
    {
      "Effect": "Allow",
      "Action": "ses:CreateContact",
      "Resource": "arn:aws:ses:YOUR_REGION:YOUR_ACCOUNT_ID:contact-list/EmailNewsletter"
    },
    {
      "Effect": "Allow",
      "Action": [
        "xray:PutTraceSegments",
        "xray:PutTelemetryRecords",
        "xray:GetSamplingRules",
        "xray:GetSamplingTargets"
      ],
      "Resource": ["*"]
    }
  ]
}
```

Second, create the following trust policy, so the Step Function can assume the role. If you use the web interface AWS Console to create a Step Function state machine, this would be created automatically for you. This allows our Step Function to use the role we attach to it, and, by extension, get access to SES. As filename we choose `stepfunctions-newsletter-subscribe.trust-policy.json`.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "states.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Here, `states.amazonaws.com` refers to the Step Functions service. For some reason, they call it `states` and not `stepfunctions`. I could not figure out why.

Anyway, now we can [create the role](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/create-role.html) with the trust policy.

```sh
aws iam create-role \
 --role-name StepFunctionsNewsletterSubscribeRole \
 --assume-role-policy-document file://stepfunctions-newsletter-subscribe.trust-policy.json
```

The final step here is to attach the policy to the role. We use the [put-role-policy](https://docs.aws.amazon.com/cli/latest/reference/iam/put-role-policy.html) endpoint to create an inline policy on the role in a single command to save us the trouble of creating a separate policy and attaching it to the role in two commands.

```sh
aws iam put-role-policy \
    --role-name StepFunctionsNewsletterSubscribeRole \
    --policy-name StepFunctionsNewsletterSubscribePolicy \
    --policy-document file://stepfunctions-newsletter-subscribe.policy.json
```

Et voila, we have the policy chores taken care of.
Now we can create the Step Function state machine!

### Create the Step Functions State Machine

Finally, we get into the real action - creating the workflow with Step Functions that we saw at the very top of the article.

Create a file `newsletter-subscribe.sfn-workflow.json` with the following content. This is Amazon State Language (ASL), a JSON-based language for describing workflows. You can find a [full reference here](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-amazon-states-language.html).

<!-- TODO use sesv2 -->

Remember to replace `YOUR_SENDER_EMAIL` with the email address you verified in SES.

```sh
{
  "Comment": "A description of my state machine",
  "StartAt": "Simplified Validation",
  "States": {
    "Simplified Validation": {
      "Type": "Choice",
      "Choices": [
        {
          "And": [
            {
              "Variable": "$.email",
              "IsPresent": true
            },
            {
              "Variable": "$.email",
              "IsString": true
            }
          ],
          "Next": "Save Contact"
        }
      ],
      "Default": "Pass"
    },
    "Pass": {
      "Type": "Pass",
      "End": true
    },
    "Save Contact": {
      "Type": "Task",
      "Parameters": {
        "ContactListName": "EmailNewsletter",
        "EmailAddress.$": "$.email"
      },
      "Resource": "arn:aws:states:::aws-sdk:sesv2SES' :createContact` API fails ",
      "ResultPath": null,
      "Next": "Transform for Welcome Email"
    },
    "Transform for Welcome Email": {
      "Type": "Pass",
      "Parameters": {
        "email.$": "$.email",
        "templateData": {
          "email.$": "$.email"
        }
      },
      "Next": "Send Welcome Email"
    },
    "Send Welcome Email": {
      "Type": "Task",
      "Parameters": {
        "Destination": {
          "ToAddresses.$": "States.Array($.email)"
        },
        "Source": "YOUR_SENDER_EMAIL",
        "Template": "EmailNewsletterWelcome",
        "TemplateData.$": "States.JsonToString($.templateData)"
      },
      "Resource": "arn:aws:states:::aws-sdk:ses:sendTemplatedEmail",
      "End": true
    }
  }
}
```

Feel free to check out what this looks like with the Visual Editor in the AWS Console.

We will use the [create-state-machine](https://docs.aws.amazon.com/cli/latest/reference/stepfunctions/create-state-machine.html) endpoint to do this.

```sh
ACCOUNT_ID="YOUR_ACCOUNT_ID"
aws stepfunctions create-state-machine \
    --name "NewsletterSubscribe" \
    --definition file://newsletter-subscribe.sfn-workflow.json \
    --role-arn "arn:aws:iam::${ACCOUNT_ID}:role/StepFunctionsNewsletterSubscribeRole"
```

Note: If you made a mistake with attaching the role to the state machine, you **cannot use** `create-state-machine` to change the role. You will need to use [update-state-machine](https://docs.aws.amazon.com/cli/latest/reference/stepfunctions/update-state-machine.html) to fix it instead (or delete and recreate the state machine).

### Validate the workflow

For fast feedback cycles, let's immediately try out our new workflow. The best way to do this is via the AWS Console. So login to [AWS](http://aws.amazon.com/), select your region, and go to the Step Functions service. From the sidebar, select _State machines_. Then select our newly created state machine named `NewsletterSubscribe`. Click on it and then click on the "Start Execution" button. In the dialog that opens, provide the following state machine input (replace `YOUR_CONTACT_EMAIL` with your email address that is validated in SES):

```sh
{
  "email": "YOUR_CONTACT_EMAIL"
}
```

<!-- TODO add an image -->

```sh
REGION="YOUR_REGION"
ACCOUNT_ID="YOUR_ACCOUNT_ID"
CONTACT_EMAIL="YOUR_CONTACT_EMAIL"
aws stepfunctions start-execution \
    --state-machine-arn "arn:aws:states:${REGION}:${ACCOUNT_ID}:stateMachine:NewsletterSubscribe" \
    --input "{\"email\" : \"${CONTACT_EMAIL}\"}"


aws stepfunctions start-execution \
    --state-machine-arn "arn:aws:states:us-east-1:756399734264:stateMachine:NewsletterSubscribe" \
    --input "{\"email\" : \"typescripteatime@gmail.com\"}"

```

#### Troubleshooting your State Machine

If the workflow fails, one of the states in the diagram should be highlighted in red. Click on it. In the details that open, you find a tab _Exception_. Here you find a summary of the error. If the error is clear enough for you too fix, awesome. Let's go fix it. You can also check the tab _Step Input_ to check whether the data passed into the state is correct.

If you need further information, scroll down the page to the _Execution event history_ table. One of these events should say _TaskFailed_. Check the event and the surrounding events to find out what happened in detail.

Here are a few errors into which I ran:

- `User: arn:aws:sts::1111111111:assumed-role/StepFunctionsNewsletterSubscribeRole/ASDF is not authorized to perform: ...`
  - Double check that you attached the correct role to the state machine. Easiest to do via the AWS Console -> Step Functions.
  - Double check that the role has the correct permissions. Easiest to do via the AWS Console -> IAM.
- `SesV2.AlreadyExistsException`
  - You already subscribed with this email address. Delete the contact with [delete-contact](https://docs.aws.amazon.com/cli/latest/reference/sesv2/delete-contact.html), or try again with a different email address but remember to validate it in SES.
- Workflow is green but no email received in your inbox
  - Via the Step Functions UI verify that the _Step Input_ of the execution used the correct email.
  - Ensure that sending works via `aws sesv2 send-email` as described in this [previous section](#send-your-first-templated-email). You can find more troubleshooting information about this issue in that section.

## Setup API Gateway and invoke your subscribe workflow via HTTP

Now that we've got SES and our Step Functions state machine set up, let's allow a subscriber to send a `POST` request to us to subscribe. We will use API Gateway to do this.

### Create API Gateway API

We start by creating an API object. This is the top level object that will contain all our routes. We will use the [create-api](https://docs.aws.amazon.com/cli/latest/reference/apigatewayv2/create-api.html) endpoint to do this.

```sh
aws apigatewayv2 create-api \
    --name "Newsletter" \
    --protocol-type HTTP \
    --description "API for managing the blog newsletter"
```

Take a note of the `ApiId` returned from the command. We will use it in the next few steps. If you missed to copy it, use `aws apigatewayv2 get-apis` to list all your APIs.

The `--protocol-type HTTP` option is one of the 2 available options of APIs on API Gateway. The other one is `WEBSOCKET`. Since we want to receive `POST` requests, we use `HTTP`.

For API Gateway to actually provision a URL that we can `POST` to from our blog website, we need to create what's called a Stage with [create-stage](https://docs.aws.amazon.com/cli/latest/reference/apigatewayv2/create-stage.html). A stage is a version of the API that is deployed. For example, you could have multiple stages for v1 and v2 of your api. We will just use the default stage name referenced by the keyword `$default`.

```sh
API_ID='YOUR_API_ID'
aws apigatewayv2 create-stage \
    --api-id $API_ID \
    --stage-name '$default' \
    --auto-deploy
```

### Create a route and call the Step Functions state machine

In API Gateway, we create routes like `POST /subscribe` and attach _integrations_ to it. In our case, the integration is a configuration to invoke our Step Functions state machine. We will configure the integration to pass down the JSON request body to Step Functions so that our state machine can access the `email`.

To do this, we need to give our API the permissions to invoke our Step Functions state machine. We do this by creating a role with the correct permissions and attaching it to the API. This is analog to what we did before to allow our Step Function state machine to invoke SES. So let's get to it.

We start with the trust policy of the role so our API can assume the role. Create a file `apigateway-execution-role.trust-policy.json` with the following content

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Next, we prepare the policy containing the permissions for our API to start our Step Function state machine. The corresponding permission within Step Functions (= `states`) is `start-execution`. Let's put everything in a file `stepfunctions-start-execution-of-newsletter-subscribe.policy.json`. Be sure to replace `YOUR_REGION` and `YOUR_ACCOUNT`.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "states:StartExecution",
      "Resource": "arn:aws:states:YOUR_REGION:YOUR_ACCOUNT:stateMachine:NewsletterSubscribe"
    }
  ]
}
```

Now we can create the role and attach the policy to it. We need the API ID from before to do this. Again, if you lost track of it, use `aws apigatewayv2 get-apis` to list all your APIs.

```sh
aws iam create-role \
    --role-name ApiGatewayExecutionRoleForStepFunctionsNewsletterSubscribe \
    --assume-role-policy-document file://apigateway-execution-role.trust-policy.json

aws iam put-role-policy \
    --role-name ApiGatewayExecutionRoleForStepFunctionsNewsletterSubscribe \
    --policy-name StepFunctionsStartExecutionOfNewsletterSubscribe \
    --policy-document file://stepfunctions-start-execution-of-newsletter-subscribe.policy.json
```

Now we can create the integration to our Step Functions state machine using [create-integration](https://docs.aws.amazon.com/cli/latest/reference/apigatewayv2/create-integration.html).

```sh
API_ID='YOUR_API_ID'
ACCOUNT_ID='YOUR_ACCOUNT_ID'
REGION='YOUR_REGION'

aws apigatewayv2 create-integration \
    --api-id $API_ID \
    --integration-type AWS_PROXY \
    --integration-subtype StepFunctions-StartExecution \
    --credentials-arn "arn:aws:iam::${ACCOUNT_ID}:role/ApiGatewayExecutionRoleForStepFunctionsNewsletterSubscribe" \
    --payload-format-version 1.0 \
    --request-parameters "{\"StateMachineArn\": \"arn:aws:states:${REGION}:${ACCOUNT_ID}:stateMachine:NewsletterSubscribe\", \"Input\": \"\$request.body\"}"
```

Take a note of the returned `IntegrationId`. We will use it in the next step.

But first, let's try to understand this command. With the help of `--integration-type AWS_PROXY` we tell API Gateway to integrate with _some_ AWS Service. Then, using `--integration-subtype StepFunctions-StartExecution` we specify that it should do a `StartExecution` api call from Step Functions. The details of which state machine to invoke and how to invoke it are then defined within `--request-parameters`.

The `--request-parameters`' format is defined in the [integration reference](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-aws-services-reference.html#StepFunctions-StartExecution). Using this stringified JSON, we pass the ARN of our Step Functions state machine and specify that the HTTP request body should be passed to the state machine as input. The `$request.body` is a special syntax that API Gateway uses to refer to the request body. You can find the available options in the [Working with AWS Service Integrations Docs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-aws-services.html). For anything more complicated than this, I suggest you use `--cli-input-json` instead.

Finally, the `--credentials-arn` is the ARN of the role that API Gateway uses to invoke `StartExecution` with. This is the role we created before.

As a side note, when I constructed the permissions, I started writing this integration and in that process determined the minimal permissions needed to run the integration. So while the commands are executed in the same order as written down in this article, the corresponding research was vice-versa.

Continuing on, we can create the route `POST /subscribe` to our integration using [create-route](https://docs.aws.amazon.com/cli/latest/reference/apigatewayv2/create-route.html). We need the `ApiId` and `IntegrationId` from `create-integration` to do this. If you lost track of either one, use `aws apigatewayv2 get-apis` or `aws apigatewayv2 get-integrations --api-id YOUR_API_ID` to list all your integrations.

```sh
API_ID='YOUR_API_ID'
INTEGRATION_ID="YOUR_INTEGRATION_ID"
aws apigatewayv2 create-route \
  --api-id $API_ID \
  --route-key 'POST /subscribe' \
  --target "integrations/$INTEGRATION_ID"
```

### Test your Subscription API

Test via

TODO change email and stuff

```sh
CONTACT_EMAIL="YOUR_CONTACT_EMAIL"
curl --request POST \
  --url https://evef8ow37e.execute-api.us-east-1.amazonaws.com/subscribe \
  --header 'content-type: application/json' \
  --data '{"email": "${CONTACT_EMAIL}"}'
```

### Bonus: Setup CORS

We now have a working API Gateway HTTP API that can be used to subscribe to our newsletter. If the blog that is including the subscribe form is hosted on a different domain and uses JavaScript to send the POST request to `YOUR_API_GATEWAY_URL/subscribe`, we will need to setup CORS. Otherwise, we will get the notorious `blocked by CORS policy` error in our browser dev tools.

Fortunately, API Gateway makes it very simple to do this. We can use the [update-api](https://docs.aws.amazon.com/cli/latest/reference/apigatewayv2/update-api.html) command to update the API with the CORS configuration. The command will only update the CORS configuration and leave the rest of the API untouched. Remember to replace `YOUR_API_ID` and `YOUR_CORS_ORIGIN` with your own values. Here, `YOUR_CORS_ORIGIN` is the domain that is hosting the blog that includes the subscribe form. For example, if the blog is hosted at `https://www.example.com`, then `YOUR_CORS_ORIGIN` should be `https://www.example.com`, including the protocol `https`.

```sh
API_ID='YOUR_API_ID'
ORIGIN="YOUR_CORS_ORIGIN"
# for example, ORIGIN="https://www.example.com"
aws apigatewayv2 update-api --api-id $API_ID --cors-configuration AllowOrigins=$ORIGIN,AllowMethods="POST",AllowHeaders="Content-Type"
```

With this, we allow exactly the blog's domain to send us `POST` requests which have the `Content-Type` header set.

That's all there is to setting up CORS for our purposes! Wasn't that simple? 😊

## Next Steps

This is a great basis to built on top of. Here are some ideas for next steps.

- add an id to the contact
  - either via SES contact's attribute data or by additionally saving the contact to a database like DynamoDB
- handle duplicate email
  - SES' `createContact` API fails if the email already exists.
  - can be done by updating our existing Step Functions state machine and corresponding permissions
- workflow to unsubscribe
  - add a separate route `GET /unsubscribe?id=12345` to unsubscribe from the newsletter
  - requires a new state machine, corresponding permissions, API route and integration
  - Ideally, we also put the unsubscribe link in each email sent to the user.
- workflow to regularly check whether a new blog article was posted
- workflow to send the email once a new blog article was posted

In fact, I will implment each one and write corresponding articles about them in the next few weeks. Stay tuned!

## Closing

That's it for now. I hope you enjoyed this post. If you have any questions or comments, please leave them below. For more AWS content, join my Twitch Live Coding streams, the [TypeScriptTeatime](https://www.twitch.tv/typescriptteatime). Looking forward to see you!

## References

- [AWS Step Functions](https://docs.aws.amazon.com/step-functions/)
- [AWS Simple Email Service](https://aws.amazon.com/ses/)
- [AWS CLI ses (version 1)](https://docs.aws.amazon.com/cli/latest/reference/ses/index.html)
- [AWS CLI sesv2](https://docs.aws.amazon.com/cli/latest/reference/sesv2/index.html)
- [AWS API Gateway - Working with AWS Service Integrations](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-aws-services.html)
