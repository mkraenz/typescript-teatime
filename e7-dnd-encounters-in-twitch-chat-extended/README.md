# TypeScript TeaTime Episode 7

## Topics Vote

- Terraform (e6 continuation)
  - cloud provision -> create AWS S3 buckets, EC2, Lambda, Kubernetes
  - AWS: IAM, EC2, S2 buckets
- DnD fights in twitch chat (e2 continuation)

**Voted:** Dnd fights

## Dnd Fights

- [x] look at the bot from episode 2
- [x] fight a monster
- [x] decide on next steps
- [x] append messages to DOM
- [x] end the battle
- [ ] database
  - [x] receive HTTP requests
  - [x] save to database
  - [x] return from database
  - [x] update an adventurer
  - [x] validation on mongoose level
  - [x] validate uniqueness of username
  - [x] validation on API level
  - [x] expose duplication error on post as 422
  - [x] e2e testing
  - [x] refactor to typegoose
    - [x] include typegoose + nestjs-typegoose
    - [x] fix error filtering for duplicate errors -> kaputtrepariert
    - [x] inject the mongo URI
    - [x] fix tests one by one
    - [x] repaired the kaputtrepariert error filtering
    - [x] strip non-whitelisted properties on API level
    - [x] try again with global Validation pipe
  - [ ] schema migrations
    - [x] pick a library -> `migrate-mongo`
    - [x] do a basic migration
    - [x] revert a migration
    - [ ] migrate migrations to typescript <https://github.com/seppevs/migrate-mongo/issues/79>
    - [ ] mongoose schema to migration
      - [ ] up
      - [ ] down
  - [x] GET single adventurer
    - [x] implement
    - [x] fix broken PATCH tests
    - [x] add e2e tests
  - [x] setup VS Code Debugger with the NestJS server
  - [x] tmijs to listen constantly
    - [x] module
    - [x] install packages
    - [x] start listening for messages in twitch chat
  - [x] migrate domain logic (monster fighting)
    - [x] quick and dirty copy and paste
    - [x] object-orientated implementation
      - [x] domain design
      - [x] handle victory
      - [x] fix dependency injection issues
      - [x] handle defeat
      - [x] display attack messages in console
      - [x] throw out dead code
  - [x] persist progress
  - [x] can play multiple rounds with new adventurers each time
  - [x] fix tests
  - [x] resolve TODOs
  - [ ] integration test battles
  - [ ] display attack messages in a visible place
  - [ ] Deployment: have server running all the time
  - [ ] write bot messages to twitch chat

### On frontend

- [ ] after one battle was lost, the next !ambush shoul d still work (currently the 2nd monster never attacks)
- [ ] autoscroll the page
- [ ]

Adventurers / Users

- username
- level
- base attack - random ( ) -> attack damage = d20 + base attack + level
- exp

-> saved in database to persist across streams

## Resoures

- <https://github.com/tmijs/tmi.js>
- <https://dev.twitch.tv/docs/irc>
- <https://hub.docker.com/_/mongo>
- <https://docs.nestjs.com/recipes/mongodb>
- <https://nestjs.com>
- <https://mongoosejs.com>

## Feature Ideas

- rendering
  - expose the gamelog to api
  - browser-source running with phaserjs
  - webpage + game with phaserjs
- loot
  - backpack - MVP: every item in backpack applies +1 dmg
  - items
  - equipment for character (1xhead, 1xweapon, 1x armor, 1x leg armor)
- persisted health + revives / health potions

## TODOs until next week episode 16

- setup a base phaserjs project - reference Onitaoshi
- deploy the app to AWS Fargate + AWS DocumentDB + accessable via a Loadbalancer
