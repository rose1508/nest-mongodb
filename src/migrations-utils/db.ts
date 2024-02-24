/* eslint-disable prettier/prettier */
// src/migrations-utils/db.ts
import { MongoClient, MongoClientOptions, Db } from 'mongodb';
import { configs } from '../config/config';  // Use a relative import

const MONGO_URL = configs.mongoUrl;

const mongoClientOptions: MongoClientOptions = {
  useUnifiedTopology: true,
} as any;

export const getDb = async (): Promise<{ db: Db; client: MongoClient }> => {
  const client: MongoClient = await MongoClient.connect(MONGO_URL, mongoClientOptions);
  const db: Db = client.db();

  return { db, client };
};
