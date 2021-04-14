import fs from 'fs';
import getUrls from 'get-urls';
import readline from 'readline';
import shell from 'shelljs';
import { parseLine } from './lib/parseLine';

const videoIds = [987266741]; // get from URL on a twitch video
const outputFilename = 'all-chats-links.txt';
const tmpAllChatLogs = 'all-chatlogs.txt';

async function main() {
  shell.rm(tmpAllChatLogs);

  videoIds.forEach((video) => {
    shell.exec(`yarn twitch-chatlog ${video} >> ${tmpAllChatLogs}`);
  });

  const fileStream = fs.createReadStream(tmpAllChatLogs);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const links: string[] = [];
  for await (const line of rl) {
    const isNotAChatLog = !line.match(/\[\d{2}\//);
    if (isNotAChatLog) continue;

    const log = parseLine(line);
    const linksInMsg = getUrls(log.message);
    links.push(...linksInMsg);
  }

  const fileData = links.join('\n');
  fs.writeFileSync(outputFilename, fileData);

  console.log(`Success! Links written to ${outputFilename}`);
  shell.rm(tmpAllChatLogs);
}

main();
