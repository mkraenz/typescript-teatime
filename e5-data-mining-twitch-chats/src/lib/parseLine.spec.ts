import { parseLine } from './parseLine';

const chatLog =
  '[04/7/21, 06:10:16 PM] <hcustovic1> hmm sound is a bit low for me :(';

it('parse the date', () => {
  const result = parseLine(chatLog);
  expect(result).toEqual({
    date: new Date('2021-04-07T18:10:16Z'),
    message: 'hmm sound is a bit low for me :(',
    username: 'hcustovic1',
  });
});
