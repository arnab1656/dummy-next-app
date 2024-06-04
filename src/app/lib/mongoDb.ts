import { Db, MongoClient } from "mongodb";

const uri = process.env.NEXT_ATLAS_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  ssl: true,
  tlsAllowInvalidCertificates: true,
};

let mongoClient: MongoClient | null = null;
let database: Db | null = null;

declare const global: any;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

export default async function connectToDatabase() {
  try {
    if (mongoClient && database) {
      return { mongoClient, database };
    }
    if (process.env.NODE_ENV === "development") {
      if (!global._mongoClient) {
        mongoClient = await new MongoClient(uri!, options).connect();
        global._mongoClient = mongoClient;
      } else {
        mongoClient = global._mongoClient;
      }
    } else {
      mongoClient = await new MongoClient(uri!, options).connect();
    }
    database = mongoClient!.db(process.env.NEXT_ATLAS_DATABASE);
    return { mongoClient, database };
  } catch (e) {
    console.error("Failed to connect to the database", e);
    throw new Error("Failed to connect to the database");
  }
}
