// uses globals: tmi, dontdothisinrealcode, _ (lodash) included in index.html
const client = new tmi.Client({
  options: { debug: true },
  connection: { reconnect: true },
  identity: {
    username: "fadeoutsamabot",
    // globals.js contains var dontdothisinrealcode = 'oauth:<mysecrettoken>' which is an oauth token generated as described in https://dev.twitch.tv/docs/irc
    password: dontdothisinrealcode,
  },
  channels: ["fadeoutsama"],
});

client.connect();

let monster = null;
let users = []; // party
let timerInterval = null;

client.on("message", (channel, tags, message, self) => {
  if (self) return; // Ignore echoed messages.
  const username = tags.username;
  const say = (text) => client.say(channel, text);

  logChatToPage(tags, message);

  hello(message, channel, tags);
  rollDice(channel, tags, message);

  if (message.toLowerCase() === "!ambush") {
    const timeTillAttackInSeconds = 10;
    monster = _.cloneDeep(monsters[_.random(monsters.length - 1)]);
    client.say(
      channel,
      `⚔️ An ambush! You're party is in a ${monster.area}. A wild ${monster.name} appeared. Be prepared! The attack starts in ${timeTillAttackInSeconds} seconds. ❤️: ${monster.hp}`
    );
    if (!timerInterval) {
      timerInterval = window.setInterval(() => {
        const randomUser = users[_.random(users.length - 1)];
        const monsterTarget = randomUser;
        if (!monsterTarget) {
          console.log("Battle lost");
          say(
            `🔥🔥🔥🔥🔥 ⚰️⚰️⚰️⚰️ Defeat! The battle is lost. The world must rely on another group of adventurers. ${monster.name} lived happily ever after.`
          );
        }
        const damage = _.random(19) + 1;
        monsterTarget.hp -= damage;
        if (monsterTarget.hp < 0) {
          users = users.filter((u) => u.username !== monsterTarget.username);
          say(
            `⚰️⚰️⚰️ Oh no! @${monsterTarget.username} has been killed by ${monster.name}`
          );
        }

        console.log(user, { damage });
        users.forEach((user) => (user.hasAttacked = false));

        say(
          `🔥 ${monster.name} dealt ${damage} damage to @${monsterTarget.username}. ${monsterTarget.username} has ${monsterTarget.hp} ❤️ left.`
        );
      }, timeTillAttackInSeconds * 1000);
    }
  }

  if (message.toLowerCase() === "!join") {
    console.log(users);
    users.push({ username: username, hasAttacked: false, hp: 150 });
    client.say(channel, `⚔️ ${username} joined the battle alongside you.`);
  }

  const user = users.find((u) => u.username === username);
  if (
    message.toLowerCase().includes("!attack") &&
    monster &&
    user &&
    !user.hasAttacked
  ) {
    console.log(username, "attacks");
    user.hasAttacked = true;
    const damage = _.random(19) + 1;
    monster.hp -= damage;
    say(
      `🗡️ @${username} dealt ${damage} damage to ${monster.name}. ${monster.hp} ❤️ left.`
    );

    if (monster.hp <= 0) {
      window.clearInterval(timerInterval);
      say(
        `🏆🏆🏆🎉🏅 VICTORY! ${monster.name} has been struck down. @${users
          .map((u) => u.username)
          .join(", @")} earned x00 EXP.`
      );
    }
  }
});

function logChatToPage(tags, message) {
  console.log(`${tags["display-name"]}: ${message}`);
  const messageItem = document.createElement("li");
  const nameAndMessage = `${tags["display-name"]}: ${message}`;
  messageItem.innerHTML = _.escape(nameAndMessage);
  document.querySelector("#chat-messages").appendChild(messageItem);
}

function hello(message, channel, tags) {
  if (message.toLowerCase() === "!hello") {
    // "@alca, heya!"
    client.say(channel, `@${tags.username}, heya!`);
  }
}

function rollDice(channel, tags, message) {
  const sayDiceRoll = (roll) =>
    client.say(channel, `@${tags.username} rolled ${roll + 1}`);
  if (message.toLowerCase() === "!d2") {
    const roll = _.random(1) + 1;
    sayDiceRoll(roll);
  }
  if (message.toLowerCase() === "!d6") {
    const roll = _.random(5) + 1;
    sayDiceRoll(roll);
  }
  if (message.toLowerCase() === "!d20") {
    const roll = _.random(19) + 1;
    sayDiceRoll(roll);
  }
}
