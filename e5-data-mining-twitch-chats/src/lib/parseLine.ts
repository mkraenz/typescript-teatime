export const parseLine = (
  line: string
): { date: Date; username: string; message: string } => {
  // line is in the following format:
  // [04/7/21, 06:10:16 PM] <fadeoutsama> test stuff
  const date = new Date(line.replace('[', '').split(']')[0]);
  const username = line.split('<')[1].split('>')[0];
  const metaAndMessages = line.split(`${username}> `);
  metaAndMessages.shift();
  const message = metaAndMessages.join('');
  return {
    date,
    username,
    message,
  };
};
