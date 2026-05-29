import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient | null> | undefined;
}

const options = {};

let client: MongoClient | null;
let clientPromise: Promise<MongoClient | null>;

if (!uri) {
  clientPromise = Promise.resolve(null);
} else {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect().catch(() => null);
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect().catch(() => null);
  }
}

export default clientPromise;
