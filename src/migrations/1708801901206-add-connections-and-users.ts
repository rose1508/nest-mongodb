/* eslint-disable prettier/prettier */
// src/migrations-utils/template.ts
import { getDb } from 'src/migrations-utils/db';

export const up = async () => {
  const { db, client } = await getDb();
  try {
    
    await db.createCollection('newCollection');
  } finally {
    await client.close(); // Close the MongoClient
  }
};

export const down = async () => {
  const { client } = await getDb();
  try {
    
  } finally {
    await client.close(); // Close the MongoClient
  }
};
