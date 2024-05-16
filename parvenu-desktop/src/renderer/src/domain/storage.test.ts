import { Storage } from './storage';

it('after emptying storage, every ware has amount zero', () => {
  const storage = new Storage();

  storage.empty();

  storage.waresList.forEach((ware) => expect(ware.amount).toBe(0));
  expect.hasAssertions();
});
