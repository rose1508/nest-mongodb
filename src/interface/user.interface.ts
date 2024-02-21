/* eslint-disable prettier/prettier */
import { Connection, Document } from "mongoose";
export interface User extends Document {
    readonly id: number;
    readonly name: string;
    readonly username: string;
    readonly email: string;
    readonly age: number;
    readonly password: string;
    readonly gender: string;
    readonly phoneNumber: string;
readonly connections:Connection[];
}


