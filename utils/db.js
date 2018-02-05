const MongoClient = require('mongodb').MongoClient;

const utils = require('.');


const COLLECTIONS = {
  Endpoints: 'endpoints',
  /*
    {
      uniqueId: string,
      createdAt: datetime,
      requestsCount: number
    }
  */
  Requests: 'requests',
  /*
    {
      _endpointId,
      createdAt: datetime,
      method: string
      headers: [string],
      query: object
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
      uniqueId: null,
      requestsCount: 0
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

    await collection.insertOne(endpoint);

    return endpoint;
  }

  async getEndpoint(uniqueId) {
    return await db.collection(COLLECTIONS.Endpoints).findOne({ uniqueId });
  }

  async createRequest(endpoint, method, query, headers) {
    let request = {
      _endpointId: endpoint._id,
      createdAt: new Date(),
      method,
      headers,
      query
    };

    let result = await db.collection(COLLECTIONS.Requests).insertOne(request);

    if (result.insertedId) {
      await db.collection(COLLECTIONS.Endpoints).updateOne({ _id: endpoint._id }, { $inc: { requestsCount: 1 } });
    }

    return request;
  }

  async getEndpointRequests(endpoint) {
    return await db.collection(COLLECTIONS.Requests).find({ _endpointId: endpoint._id }).toArray();
  }
}


module.exports = new DB;
