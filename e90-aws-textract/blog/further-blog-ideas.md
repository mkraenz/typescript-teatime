# TODO Further blog ideas

- how to run a step functions state machine from Api Gateway GET method
  - using RestApi
  - most important part: the api route has GET, but the integration Request uses POST
    - if using the wrong integration method, using `TEST` will log an `UnknownOperationException` even though the requestpayload etc from APIGW to the step functions API look alright
  - to pass query string parameters to the state machine input, the Mapping Template in Integration Request is important
- how to validate (and transform) input on Api Gateway for your Step Functions state machine
- how to return a static html from API Gateway that also triggers a Step Functions State Machine
- Typical mistakes with API GW: after changing stuff, did not deploy? missing autodeploy? Also if you deployed, it may need a couple of minutes to be accessible from the public internet. This is contrary to calling the API from within the AWS Console using the `TEST` button under Resources -> select any method.
