# Build a Serverless Mailchimp Clone with AWS Step Functions and AWS Simple Email Service

- api gateway endpoint
  - integrate the api gateway endpoint with the step function
  - send the correct input to the step function `{"email": "$request.querystring.email"}`
  - needs permissions to invoke the step function
- step function
  - call SES deleteContact
  - needs permissions to call SES deleteContact

Create the trust policy `stepfunctions-newsletter-unsubscribe.trust-policy.json`

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

Next, create the policy `stepfunctions-newsletter-unsubscribe.policy.json` to access the SES DeleteContact api on our contact list `EmailNewsletter` .

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ses:DeleteContact",
      "Resource": "arn:aws:ses:YOUR_REGION:YOUR_ACCOUNT_ID:contact-list/EmailNewsletter"
    }
  ]
}
```

Now we can create the role and attach the policy to access SES.

```sh
# create role
aws iam create-role \
 --role-name StepFunctionsNewsletterUnsubscribeRole \
 --assume-role-policy-document file://stepfunctions-newsletter-unsubscribe.trust-policy.json

# attach permissions to access SES
aws iam put-role-policy \
    --role-name StepFunctionsNewsletterUnsubscribeRole \
    --policy-name StepFunctionsNewsletterUnsubscribePolicy \
    --policy-document file://stepfunctions-newsletter-unsubscribe.policy.json
```

Create the Step function state machine input JSON `newsletter-unsubscribe.sfn-workflow.json` with the following content:

```json
{
  "Comment": "A description of my state machine",
  "StartAt": "DeleteContact",
  "States": {
    "DeleteContact": {
      "Type": "Task",
      "End": true,
      "Parameters": {
        "ContactListName": "EmailNewsletter",
        "EmailAddress.$": "$.email"
      },
      "Resource": "arn:aws:states:::aws-sdk:sesv2:deleteContact"
    }
  }
}
```

For the email address parameter, we just use the state machine input `$`.
That means, we later need to setup our API Gateway endpoint to directly pass down the email into the state machine input.

Finally, create the State Machine with the following command:

```sh
aws stepfunctions create-state-machine \
    --name "NewsletterUnsubscribe" \
    --definition file://newsletter-unsubscribe.sfn-workflow.json \
    --role-arn "arn:aws:iam::756399734264:role/StepFunctionsNewsletterUnsubscribeRole"
# aws stepfunctions update-state-machine \
#     --state-machine-arn 'arn:aws:states:us-east-1:756399734264:stateMachine:NewsletterUnsubscribe' \
#     --definition file://newsletter-unsubscribe.sfn-workflow.json
```

## Api Gateway Endpoint

Assuming you have already setup the API for `/subscribe` from our [previous article](TODO link to previous article), we just need to create a new route, integrate with our Unsubscribe state machine, and setup permissions.

```sh
API_ID='YOUR_API_ID'
ACCOUNT_ID='YOUR_ACCOUNT_ID'
REGION='YOUR_REGION'

ACCOUNT_ID='756399734264'
REGION='us-east-1'
API_ID='evef8ow37e'

aws iam create-role \
    --role-name ApiGatewayExecutionRoleForStepFunctionsNewsletterUnsubscribe \
    --assume-role-policy-document file://apigateway-execution-role.trust-policy.json

aws iam put-role-policy \
    --role-name ApiGatewayExecutionRoleForStepFunctionsNewsletterUnsubscribe \
    --policy-name StepFunctionsStartExecutionOfNewsletterUnsubscribe \
    --policy-document file://stepfunctions-start-execution-of-newsletter-unsubscribe.policy.json

aws apigatewayv2 create-integration \
    --api-id $API_ID \
    --integration-type AWS_PROXY \
    --integration-subtype StepFunctions-StartExecution \
    --credentials-arn "arn:aws:iam::${ACCOUNT_ID}:role/ApiGatewayExecutionRoleForStepFunctionsNewsletterUnsubscribe" \
    --payload-format-version 1.0 \
    --request-parameters "{\"StateMachineArn\": \"arn:aws:states:${REGION}:${ACCOUNT_ID}:stateMachine:NewsletterUnsubscribe\", \"Input\": \"\$request.querystring.input\"}"

# From the returned result, copy the value of `IntegrationId`. We need it for the next command to link the integration to the route. If you did not copy it, navigate to API Gateway in the AWS Console, select your API, and select Integrations. You should see the integration you just created. Copy the value of `IntegrationId`.

INTEGRATION_ID="YOUR_INTEGRATION_ID"
INTEGRATION_ID="ji2b8zl"
aws apigatewayv2 create-route \
  --api-id $API_ID \
  --route-key 'GET /unsubscribe' \
  --target "integrations/$INTEGRATION_ID"
```

### Testing

First, let's ensure that the contact we want to unsubscribe is actually in the contact list.

```sh
aws sesv2 list-contacts --contact-list-name "EmailNewsletter"
```

If it is there, we can test the unsubscribe endpoint using `curl`. If not, subscribe to the newsletter first, either by calling the `curl` from our previous article, or by just running the following command (replace `YOUR_EMAIL_ADDRESS`):

```sh
aws sesv2 create-contact --contact-list-name "EmailNewsletter" --email-address "YOUR_EMAIL_ADDRESS"
```

Now it is time! Replace `YOUR_URL_ENCODED_EMAIL_ADDRESS` with the email address you want to unsubscribe to. Most importantly,

```sh
curl 'https://evef8ow37e.execute-api.us-east-1.amazonaws.com/unsubscribe?input=%7B%22email%22%3A%22YOUR_URL_ENCODED_EMAIL_ADDRESS%22%7D'
```

This translates to the following HTTP request

```http
GET https://evef8ow37e.execute-api.us-east-1.amazonaws.com/unsubscribe?input={"email":"YOUR_URL_ENCODED_EMAIL_ADDRESS"}
```

To double-check, let's run `aws sesv2 list-contacts --contact-list-name "EmailNewsletter"` again. If the email address is not in the list, then we have successfully unsubscribed the email address.
🎉 Whoop whoop! 🥳

> Disclaimer: This is a **not a secure solution**. I could just call the API with _your_ email address to unsubscribe you. 😈 To make this more secure, at the very least, we should not use their public email address to identify the contact but some random id. To make it _actually_ secure, we would probably need to use some unique token that is created for each contact-email combination, save that token, possibly also expire the token after a while, and on the contacts unsubscribe request check whether the token exists in our database.
