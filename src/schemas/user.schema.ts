/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Connection, HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop({ unique: true }) // Enforce uniqueness for email
  email: string;

  @Prop()
  age: number;

  @Prop()
  password: string;

  @Prop({ enum: ['m', 'f', 't'] })
  gender: string;

  @Prop({ type: String, length: 15, nullable: true }) // Define length and nullable
  phoneNumber: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Connection' }] }) // Reference Connection schema
  connections: Connection[];

  @Prop({
    set: async (password: string) => {
      password = await bcrypt.hash(password, 10); // Hash password before saving
    }
  })
  setPassword(password: string) { } // Define setter for password hashing
}

export const UserSchema = SchemaFactory.createForClass(User);