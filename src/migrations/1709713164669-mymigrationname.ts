/* eslint-disable prettier/prettier */
// src/migrations/20220305000000-add-connection-and-user.js
// Add this import statement
import * as bcrypt from 'bcrypt';

module.exports = {
  async up(db) {
    
    await db.createCollection('connections');
    await db.collection('connections').createIndex({ connection_id: 1 }, { unique: true });
    await db.collection('connections').createIndex({ user_id: 1 });
    await db.collection('connections').createIndex({ connection_user_id: 1 });
    await db.createCollection('users');
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').updateMany({}, { $set: { age: 0, gender: 't'} });
    await db.collection('users').updateMany({}, { $set: { connections: [] } });
    const users = await db.collection('users').find().toArray();

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await db.collection('users').updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
    }
  },
  async down(db) {
    await db.collection('users').updateMany({}, { $unset: { age: '', gender: '', connections: '' } });
    await db.collection('connections').drop();
    await db.collection('users').drop();
  
  },
};
