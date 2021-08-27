# Serverless Backend for Scheduled Expo Push Notifications

Awesome!

## Deployment

WARNING: Sending push notifications is in a separate deploy command, in order to hide the URI.

- Ensure a `.env` file exists with environment variables set properly. (see password manager)
- `yarn deploy:test`
- Test whether email sending works by executing `test.http`
- on success: `yarn deploy`

## Links

- [Serverless Dashboard](https://dashboard.serverless.com)
- [AWS Console EU Central](https://eu-central-1.console.aws.amazon.com/console/home?region=eu-central-1#)

## Development

### typeerror: e is not a function

Solution:
Check that you include the correct file path and handler name in `serverless.yml`

Symptom:
On invoke of lambda function, response is

```js
{"errorType":"TypeError","errorMessage":"e is not a function","trace":["TypeError: e is not a function","    at Runtime.handler (/var/task/serverless_sdk/index.js:24:10545)","    at Runtime.handleOnce (/var/runtime/Runtime.js:66:25)"]}
```

[Ref](https://stackoverflow.com/questions/58623612/serverless-framework-typeerror-e-is-not-a-function)
