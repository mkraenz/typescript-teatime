# Thousand Trees - Climate Action Visualizer

Godot + Networking + Webdev (auth) + AWS (Serverless?)

Canvas + Webdev + AWS
Phaser 3
Godot (maybe even 3D) - limited responsiveness

Save user data + login (?auth0 or cognito) +

Value Proposition:
**Make my climate action visible.**

**Epic**:

As a User caring about the environment,
I want to track the number of trees I've sponsored
by planting a virtual forest
so that I stay motivated for further climate action.

Questions:

- How do I track C02 reductions?

1000 trees planted Miroshige Senbonzakura Kankyou Hozen Kikin - Miroshige 1000 Cherry blossoms Environmental Protection Fund

Constraints:

- Trees in the forest should be somewhat recognizable (and not just a random assortment)
- web-enabled
- publically available (anyone can sign up and use)
- responsive
- forest should be scalable -> scrollable?

Not necessary

- to track the planting position or kind of each tree

## Implementation Guidelines

- Prototype!

## MVP 1 - forest in the current browser

- User can insert how many trees additionally got planted
  - -> number input field + Add button
- inserted number of trees gets saved (in the browser / local storage)
  - autogenerate coords for each tree and save + load
- when opening app again, trees get loaded
- trees get shown on page as a table

Implementation:

- NextJS + Chakra UI

### MVP 2 - save to the cloud

- User is authenticated
- inserted number of trees gets saved _in the cloud_
- load from the cloud

Implementation:

- use a framework like nextjs
- use AWS Cognito or auth0 or keycloak
- Serverless API for setting the number of trees
  - if using Cognito, consider AWS Api Gateway Cognito Authorizer

alternative (probably not the best):

- generate a long-lived token (aka api key) for the user on the backend
- save the token
- send the token (or as a link) to the user via email
- user uses email link to access her forest

User -> API GW -> Cognito JWT validation -> API GW -> (Lambda) -> DynamoDB -> Api GW -> User
maybe skip lambda by using a Api Gateway Service Integration directly to DynamoDb instead

## MVP 3 - draw forest

- _draw_ the forest

Implementation:

- maybe on canvas with <https://konvajs.org/>
