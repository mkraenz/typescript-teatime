# The Teawars

A Twitch Chat-controlled Turn-based Battle game from the [TypeScript Teatime](https://www.twitch.tv/typescriptteatime). Join us on [Twitch](https://www.twitch.tv/typescriptteatime) for live coding action!

## Getting started

### Prerequisites

- git and NodeJS installed

### Installation

Install, test, start, open browser:

```bash
npm run sanity-check
# in a separate terminal start the server
# the server connects to Twitch chat and handles all the game logic. This frontend only renders.
cd ../server
# then follow the instructions in the readme
```

### Building and Running

Perform a quick build (bundle.js) and start server. It will open a browser window:

```bash
npm run dev
```

## Debugging

```bash
npm run dev
# STEP: you can close the window that opens automatically
# STEP: Set a breakpoint in VS CODE
# STEP: Start 'Chrome' debug config in VS Code
# STEP: Maybe reload the window
# STEP: Trigger the breakpoint
```

Check out this cool [how-to](https://github.com/samme/phaser3-faq/wiki#how-do-i-fixdebug-my-game).

## Resources

### Phaser

- [Phaser 3 Framework](https://github.com/photonstorm/phaser)
- [Phaser 3 Docs with TypeScript Definition File](https://github.com/photonstorm/phaser3-docs)
- [Phaser 3 Online Docs](https://photonstorm.github.io/phaser3-docs/index.html)
- [Phaser 3 Examples](https://phaser.io/examples/v3)
- [Phaser 3 Examples Lab](https://labs.phaser.io/)
- [Phaser 3 Examples Lab Github](https://github.com/photonstorm/phaser3-examples)
- [Cheat sheets](https://github.com/digitsensitive/phaser3-typescript/blob/master/cheatsheets)
- [Template Project - Phaser3 with TypeScript](https://github.com/digitsensitive/phaser3-typescript)
- [RexRainbow Github Phaser 3 plugins and more](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/plugins)

### Helpful tools

- [Pixel Art Maker](http://pixelartmaker.com/)
- [Leshy SpriteSheet Tool](https://www.leshylabs.com/apps/sstool)
- [Littera](http://kvazars.com/littera)
- [MagicTools](https://github.com/ellisonleao/magictools)
- [Tiled](https://www.mapeditor.org)
- [Favicon Generator](https://favicon.io/favicon-generator/)
- [Aseprite](https://www.aseprite.org/)
- [Aseprite - How to](https://www.youtube.com/watch?v=Md6W79jtLJM)
- [Awesome Github Actions](https://github.com/sdras/awesome-actions)
- [tl;dr legal](https://tldrlegal.com/) summary of licenses
- [dat.GUI.js](https://github.com/dataarts/dat.gui) Dynamically change game object props and more
- [Audacity](https://www.audacityteam.org/) Audio software
- [CutMp3](http://manpages.ubuntu.com/manpages/bionic/man1/cutmp3.1.html) Audacity sometimes leaves a few milliseconds of silence at the end of an mp3 file. To make those files usable for looping, use this to cut. E.g. `cutmp3 -i wind.mp3 -o no_silence -a 00:00 -b 00:17`
- [Phaser3 Particle Editor](https://koreezgames.github.io/phaser3-particle-editor/)
- [jessholland Maps](https://jessholland.artstation.com/projects/ovArq)
- [Phaser3 Path Builder Plugin](https://github.com/samid737/phaser3-plugin-pathbuilder) (not working with newest Phaser3 version)

### Assets and UI

- [UIHere.com](https://www.uihere.com/free-cliparts/user-interface-design-game-game-ui-buttons-gold-coins-online-1035811)

## TODOs

- [x] display boss monster
- [x] display adventurers on join event
- [x] health bar monster
- [x] monster disappears when dead
- [x] on attack, adventurers do jump attack towards monster
- [x] on attack, monster does jump attack towards specific adventurer
- [x] display damage numbers
- [x] cleanup: only console.log raw events
- [x] sync attack with damage receival
- [x] backend exposes hp
- [x] add health bar adventurers
- [x] backend exposes max health
- [x] announcements
- [x] more adventurers WHOOO
- [x] backend streamelements bot must not !join battle
- [x] rename titlescene
- [x] monster name
- [x] names adventurers
- [x] monster assets
  - [x] pick image according to monster name -> mapping problem
  - [x] display size of differently sized images -> asset problem
  - [x] data-driven (defined everything in JSON)
- [ ] chore: fill in monster asset details -> more monsters = more fun
  - [x] first 20 monsters
  - [x] first 50 monsters
  - [x] first 100 monsters
  - [x] first 150 monsters
  - [ ] first 200 monsters
  - [ ] all monsters
- [x] dynamically determine sprite dimensions -> reduce annoying and error prone human work
- [x] allow tinting for monster assets via JSON -> greater variety
- [x] allow scaling for monster assets via JSON -> greater variety
- [x] allow alpha for monster assets via JSON -> greater variety
- [x] bug: characters in front should be visible and hide characters in the back
- [x] randomize background
- [ ] ~~choose background according to enemy area~~
- [x] backend Bug: when party dies
- [x] backend: disallow joining twice
- [x] backend exposes battles with event log as GET /battles
- [x] backend persists battles
- [ ] backend autobackup database after stream
- [ ] !move left 3
- [x] !heal @username
- [ ] ? on end, clear party after x seconds ?
