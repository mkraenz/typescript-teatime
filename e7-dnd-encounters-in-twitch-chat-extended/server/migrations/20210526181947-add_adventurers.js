// @ts-check

/**
 * @typedef {import("mongodb").Db} Db
 * @typedef {import("mongodb").MongoClient} MongoClient
 * @typedef {import("../src/adventurer/adventurer.schema").Adventurer} Adventurer
 */

/**
 * @param {Db} db
 * @param {MongoClient} client
 */
const up = async (db, client) => {
  /** @type {Adventurer} */
  const adventurer = {
    username: 'from-migrations',
    level: 3,
    experience: 1337,
  };
  await db.collection('adventurers').insertOne(adventurer);
};

/**
 * @param {Db} db
 * @param {MongoClient} client
 */
const down = async (db, client) => {
  await db.collection('adventurers').deleteOne({ username: 'from-migrations' });
};

module.exports = {
  up,
  down,
};
