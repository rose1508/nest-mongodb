/* eslint-disable prettier/prettier */
// src/migrations/20220305000000-add-connection-and-user.js
// Add this import statement
import * as bcrypt from 'bcrypt';

module.exports = {
  async up(db) {
    // Create the Connection collection
    await db.createCollection('connections');

    // Add indexes if needed
    await db.collection('connections').createIndex({ connection_id: 1 }, { unique: true });
    await db.collection('connections').createIndex({ user_id: 1 });
    await db.collection('connections').createIndex({ connection_user_id: 1 });

    // Create the User collection
    await db.createCollection('users');

    // Add indexes if needed
    await db.collection('users').createIndex({ email: 1 }, { unique: true });

    // Add the fields to the User collection
    await db.collection('users').updateMany({}, { $set: { age: 0, gender: 't' } });

    // Create the connections field as an array of ObjectIds
    await db.collection('users').updateMany({}, { $set: { connections: [] } });

    // Hash passwords for existing users
    const users = await db.collection('users').find().toArray();
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await db.collection('users').updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
    }
  },

  async down(db) {
    // Rollback logic if needed
    await db.collection('users').updateMany({}, { $unset: { age: '', gender: '', connections: '' } });
    await db.collection('connections').drop();
    await db.collection('users').drop();
  },
};
