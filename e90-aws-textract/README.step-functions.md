# AWS Step Functions

1. create lambda that receves json `{ "name": "Peter" }` -> if request query param 'name' exists, respond 'Hello Peter', else respond 'Hello World'
1. create get api endpoint /hello?name=Peter -> trigger lambda -> if request query param 'name' exists, respond 'Hello Peter', else respond 'Hello World'
1. create get api endpoint `/hello?name=Peter&email=test@example.com` -> trigger lambda -> if request query param `'name'` exists, save `Peter` to dynamodb table `'SFhelloworld'`, else respond `'Hello World'`. Then wait 5 seconds, use step functions to read from the table and send an email to `test@example.com` saying `'Hello World'`.

## Docs

- [Step Functions Latest Welcome](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html)

## Terminology

- workflow: a sequence of steps to do to automate some business task
- workflow step: a specific thing to do
- SF state machine: a workflow
- SF task: a state in a workflow that represents a single unit of work that another AWS service performs
- SF state: Each step in a workflow is a state.
- SF execution: a single instance of a workflow
- SF Intrinsic functions: helper functions that can be used in a step definition to transform strings to numbers, generate UUIDs etc. - [docs](https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-intrinsic-functions.html#asl-intrsc-func-string-operation)

## States and Patterns

- `Pass`: passes its input to its output, without performing work. Pass states are useful when constructing, testing, and debugging state machines, or as placeholder. - [docs](https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-pass-state.html)
- `Choice`: make a decision based on the state's input - [docs](https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-choice-state.html)
- `Retry` and `Catch`
- `Parallel`
- `Map`: process a series of steps for multiple items in parallel
- `Request a response`: default for integrating with other AWS services. Call a service, and let Step Functions progress to the next state after it gets an HTTP response.
- `Run a job (.sync)`: Call a service, and have Step Functions wait for a job to complete.
- `Wait for a callback with a task token (.waitForTaskToken`): Call a service with a task token, and have Step Functions wait until the task token returns with a callback.
- `Fail`: Purposefully cause the Step Function execution to fail.

## Troubleshooting

### global service principal states.amazonaws.com error

Scenario: You get the following error during execution of your step function
`Neither the global service principal states.amazonaws.com, nor the regional one is authorized to assume the provided role.`

Solution:
a. Race-condition. Since AWS IAM is only eventually-consistent, maybe your role was not created yet, or the changes to the role have not yet been propagated.
b. An actual permission error. Can't say much right now since I did not run into this error myself.
