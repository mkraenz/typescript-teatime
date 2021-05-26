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
  - [ ] ~~(validation on API level?)~~ -> not now
  - [x] expose duplication error on post as 422
  - [x] e2e testing
  - [ ] refactor to typegoose
    - [x] include typegoose + nestjs-typegoose
    - [x] fix error filtering for duplicate errors
    - [x] inject the mongo URI
    - [ ] fix tests one by one
  - [ ] setup VS Code Debugger with the NestJS server
  - [ ] discuss next steps
  - [ ] schema migrations
- [ ] apply values to fights

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
