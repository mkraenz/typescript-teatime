# Twitch Chat Bot

Disclaimer: This is not production-level code :)

## rolling dice

```log
!d2
!d6
!d12
!d20
```

## User Vote

~~a) Duelling~~  
b) Random encounters

## DnD Dungeons and Dragons Random Encounters / Epic Battles alongside Chat

### How to

```bash
# local web server for hosting
python3 -m http.server 8080
# open app locally
google-chrome http://localhost:8080



# commands in Twitch chat
## start a new random encounter. Monster attacks in 10 seconds
!ambush
## chat member joins the party
!join
## attack once per round (reset whenever monster attacks)
!attack
```

### Tech stack and resources

- [tmi.js](https://tmijs.com/#example-oauth-token-authorization) for twitch chat integration
- [Twitch docs how to build a chatbot](https://dev.twitch.tv/docs/irc)
- [github jforstneric 5th edition encounter generator](https://github.com/jforstneric/5e_encounter_generator) for providing the monster data. Awesome job!
- [csvjson.com](https://csvjson.com/) for preprocessing the monsters CSV to JSON

### Results

Record of the Twitch live chat in which we used the Encounter Generator to fight an Androspinx ([Androsphinx on forgottenrealms.fandom.com](https://forgottenrealms.fandom.com/wiki/Androsphinx)).

It's been a fierce battle.

Note: at some point Twitch starts blocking messages to avoid spam. Particularly, if messages have the identical content. This happened to all regular users and also to the bot which is why some messages towards the end are missing.

```log
hcustovic1: !ambush
fadeoutsamabot: ⚔️ An ambush! You're party is in a nature. A wild androsphinx appeared. Be prepared! The attack starts in 10 seconds. ❤️: 281
Broadcaster fadeoutsama: !join
fadeoutsamabot: ⚔️ fadeoutsama joined the battle alongside you.
hcustovic1: !join
fadeoutsamabot: ⚔️ hcustovic1 joined the battle alongside you.
Broadcaster fadeoutsama: !attack
fadeoutsamabot: 🗡️ @fadeoutsama dealt 15 damage to androsphinx. 266 ❤️ left.
fadeoutsamabot: 🔥 androsphinx dealt 11 damage to @fadeoutsama. fadeoutsama has 132 ❤️ left.
hcustovic1: !attack
fadeoutsamabot: 🗡️ @hcustovic1 dealt 9 damage to androsphinx. 257 ❤️ left.
fadeoutsamabot: 🔥 androsphinx dealt 14 damage to @hcustovic1. hcustovic1 has 136 ❤️ left.
fadeoutsamabot: 🔥 androsphinx dealt 20 damage to @hcustovic1. hcustovic1 has 116 ❤️ left.
Broadcaster fadeoutsama: !attack fiercely
fadeoutsamabot: 🗡️ @fadeoutsama dealt 13 damage to androsphinx. 244 ❤️ left.
hcustovic1: special !attack
fadeoutsamabot: 🗡️ @hcustovic1 dealt 2 damage to androsphinx. 242 ❤️ left.
fadeoutsamabot: 🔥 androsphinx dealt 11 damage to @hcustovic1. hcustovic1 has 105 ❤️ left.
fadeoutsamabot: 🔥 androsphinx dealt 9 damage to @hcustovic1. hcustovic1 has 96 ❤️ left.
hcustovic1: !attack fiercely
fadeoutsamabot: 🗡️ @hcustovic1 dealt 7 damage to androsphinx. 235 ❤️ left.
Broadcaster fadeoutsama: !attack from above
fadeoutsamabot: 🗡️ @fadeoutsama dealt 2 damage to androsphinx. 233 ❤️ left.
fadeoutsamabot: 🔥 androsphinx dealt 15 damage to @hcustovic1. hcustovic1 has 81 ❤️ left.
fadeoutsamabot: 🔥 androsphinx dealt 1 damage to @hcustovic1. hcustovic1 has 80 ❤️ left.
hcustovic1: !attack behind back
fadeoutsamabot: 🗡️ @hcustovic1 dealt 10 damage to androsphinx. 223 ❤️ left.
Broadcaster fadeoutsama: !attack the monster
fadeoutsamabot: 🗡️ @fadeoutsama dealt 11 damage to androsphinx. 212 ❤️ left.
fadeoutsamabot: 🔥 androsphinx dealt 18 damage to @hcustovic1. hcustovic1 has 62 ❤️ left.
hcustovic1: !attack
fadeoutsamabot: 🗡️ @hcustovic1 dealt 14 damage to androsphinx. 198 ❤️ left.
fadeoutsamabot: 🔥 androsphinx dealt 17 damage to @hcustovic1. hcustovic1 has 45 ❤️ left.
Broadcaster fadeoutsama: again !attack
fadeoutsamabot: 🗡️ @fadeoutsama dealt 16 damage to androsphinx. 182 ❤️ left.
hcustovic1: !attack with power
fadeoutsamabot: 🗡️ @hcustovic1 dealt 5 damage to androsphinx. 177 ❤️ left.
fadeoutsamabot: 🔥 androsphinx dealt 7 damage to @fadeoutsama. fadeoutsama has 125 ❤️ left.
Broadcaster fadeoutsama: !attack with thunderbolt
fadeoutsamabot: 🗡️ @fadeoutsama dealt 9 damage to androsphinx. 168 ❤️ left.
hcustovic1: !attack with sword
fadeoutsamabot: 🗡️ @hcustovic1 dealt 7 damage to androsphinx. 161 ❤️ left.
Broadcaster fadeoutsama: !attack with a headbump
fadeoutsamabot: 🗡️ @fadeoutsama dealt 20 damage to androsphinx. 141 ❤️ left.
hcustovic1: bow and arrow!attack
fadeoutsamabot: 🗡️ @hcustovic1 dealt 9 damage to androsphinx. 132 ❤️ left.
fadeoutsamabot: 🔥 androsphinx dealt 20 damage to @hcustovic1. hcustovic1 has 4 ❤️ left.
hcustovic1: !attack full force
fadeoutsamabot: 🗡️ @hcustovic1 dealt 6 damage to androsphinx. 126 ❤️ left.
Broadcaster fadeoutsama: sneak behind the monster and !atack
fadeoutsamabot: ⚰️⚰️⚰️ Oh no! @hcustovic1 has been killed by androsphinx
hcustovic1: 😭
fadeoutsamabot: 🔥 androsphinx dealt 16 damage to @fadeoutsama. fadeoutsama has 109 ❤️ left.
Broadcaster fadeoutsama: !attack once more
fadeoutsamabot: 🗡️ @fadeoutsama dealt 16 damage to androsphinx. 110 ❤️ left.
Broadcaster fadeoutsama: !attack
fadeoutsamabot: 🗡️ @fadeoutsama dealt 2 damage to androsphinx. 108 ❤️ left.
fadeoutsamabot: 🔥 androsphinx dealt 14 damage to @fadeoutsama. fadeoutsama has 82 ❤️ left.
hcustovic1: rip.!attack
Broadcaster fadeoutsama: rip !attack
fadeoutsamabot: 🗡️ @fadeoutsama dealt 12 damage to androsphinx. 96 ❤️ left.
hcustovic1: this was a test 😛
fadeoutsamabot: 🔥 androsphinx dealt 11 damage to @fadeoutsama. fadeoutsama has 64 ❤️ left.
hcustovic1: !join
fadeoutsamabot: ⚔️ hcustovic1 joined the battle alongside you.
Broadcaster fadeoutsama: !attack by wrestling
fadeoutsamabot: 🗡️ @fadeoutsama dealt 8 damage to androsphinx. 88 ❤️ left.
fadeoutsamabot: 🔥 androsphinx dealt 4 damage to @fadeoutsama. fadeoutsama has 60 ❤️ left.
hcustovic1: revenge!attack
fadeoutsamabot: 🗡️ @hcustovic1 dealt 6 damage to androsphinx. 82 ❤️ left.
fadeoutsamabot: 🔥 androsphinx dealt 8 damage to @fadeoutsama. fadeoutsama has 52 ❤️ left.
Broadcaster fadeoutsama: pick my nose and !attack
fadeoutsamabot: 🗡️ @fadeoutsama dealt 14 damage to androsphinx. 68 ❤️ left.
hcustovic1: strong!attack
fadeoutsamabot: 🗡️ @hcustovic1 dealt 19 damage to androsphinx. 49 ❤️ left.
Broadcaster fadeoutsama: weak !attack
fadeoutsamabot: 🗡️ @fadeoutsama dealt 8 damage to androsphinx. 41 ❤️ left.
fadeoutsamabot: 🔥 androsphinx dealt 20 damage to @fadeoutsama. fadeoutsama has 21 ❤️ left.
hcustovic1: !attack weak spot
fadeoutsamabot: 🗡️ @hcustovic1 dealt 13 damage to androsphinx. 28 ❤️ left.
Broadcaster fadeoutsama: !jump attack
fadeoutsamabot: 🔥 androsphinx dealt 19 damage to @hcustovic1. hcustovic1 has 131 ❤️ left.
hcustovic1: !attack neck
fadeoutsamabot: 🗡️ @hcustovic1 dealt 4 damage to androsphinx. 24 ❤️ left.
fadeoutsamabot: 🔥 androsphinx dealt 20 damage to @hcustovic1. hcustovic1 has 111 ❤️ left.
hcustovic1: !attack head
fadeoutsamabot: 🗡️ @hcustovic1 dealt 19 damage to androsphinx. 5 ❤️ left.
fadeoutsamabot: ⚰️⚰️⚰️ Oh no! @fadeoutsama has been killed by androsphinx
Broadcaster fadeoutsama: !attack body
hcustovic1: !finishing blow!attack
fadeoutsamabot: 🗡️ @hcustovic1 dealt 16 damage to androsphinx. -11 ❤️ left.
hcustovic1: 🏅
Broadcaster fadeoutsama: 🏆🏆🏆🎉🏅 VICTORY! androsphinx has been struck down. @hcustovic1 earned x00 EXP.
```

### Ideas + Brainstorming

```log
!join -> @username joined the battle alongside you.

!attack
-> determine attack damage by rolling a d20
-> apply damage to monster
-> bot: @username dealt X damage. The monstername has Y HP left.

finally:

if HP < 0:
bot:
bot in browser (on fadeoutsama audio output)

enemy death

enemy attacks
```

## Idea: Duelling / Fencing

Disclaimer: not implemented

```log
!engarde @<USER_NAME>

!allez @<ATTACKER_USER_NAME>

```

### Example

```log
hcustovic: !engarde @fadeoutsama
fadeoutsama: !allez @hcustovic
hcustovic: !d20
bot-> 19
fadeoutsama: !d20
bot -> 5
bot: @hcustovic won the duell with @fadeoutsama with 19 to 5.
```
