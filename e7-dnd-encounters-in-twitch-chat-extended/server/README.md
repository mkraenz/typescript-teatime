# Teawars Server

Backend Server for Teawars - a Twitch-chat-controlled Final Fantasy-style Battle game.
Developed live on stream in the [TypeScript Teatime](https://www.twitch.tv/typescriptteatime).

## Getting Started

### Prerequisites

- git and NodeJS installed
- When running MongoDB locally, you probably need Docker installed.

### Installation

```bash
npm install
npm run start:db # only needed once
npm run dev
# verify:
google-chrome http://localhost:3000/adventurers # should return HTTP 200 and an empty JSON array
```

## Running the app

```bash
# watch mode
npm run dev

# production mode
# NOTE: runs on a different port
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

### Debugging e2e tests

```bash
# add a break point in the e2e test file or in server code
npm run test:e2e:debug
# in VS Code, Ctrl+Shift+P -> `Debug: Attach to Node Process` -> select `...yarn.js test:e2e:debug`
# hit F5 / F10
```

## Inclusion in OBS streaming tool

- build the frontend package with `npm run build` (todo double-check)
- start server with `npm start`
- add a Browser Source to your scene
  - URL: `http://localhost:63140/?channel=YOUR_TWITCH_CHANNEL_NAME`
    - example URL `http://localhost:63140/?channel=typescriptteatime`
  - width: 1440
  - height: 1080
