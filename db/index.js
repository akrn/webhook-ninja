const MongoClient = require('mongodb').MongoClient;

const utils = require('../utils');


const COLLECTIONS = {
  Endpoints: 'endpoints'
  /*
    {
      uniqueId: string,
      createdAt: datetime
    }
  */
};

const UNIQUE_ID_RETRIES = 10;

let db;

class DB {
  async connect() {
    if (!db) {
      db = (await MongoClient.connect(process.env.MONGODB_URI)).db(process.env.MONGODB_DBNAME);

      await this._createIndexes();
    }
  }

  async _createIndexes() {
    await db.collection(COLLECTIONS.Endpoints).createIndex({
      uniqueId: 'hashed'
    });
  }

  async createEndpoint() {
    const collection = db.collection(COLLECTIONS.Endpoints);

    let endpoint = {
      createdAt: new Date(),
      uniqueId: null
    };

    let retry = 0;
    while (retry++ < UNIQUE_ID_RETRIES) {
      let uniqueId = utils.generateId();
      if (await collection.count({ uniqueId }) === 0) {
        endpoint.uniqueId = uniqueId;
      }
    }

    if (!endpoint.uniqueId) {
      throw new Error(`Unable to generate unique endpoint ID after ${UNIQUE_ID_RETRIES} attempts`);
    }

    let result = await db.collection(COLLECTIONS.Endpoints).insertOne(endpoint);

    return endpoint;
  }

  async getEndpoint(uniqueId) {
    return await db.collection(COLLECTIONS.Endpoints).findOne({ uniqueId });
  }
}


module.exports = new DB;
