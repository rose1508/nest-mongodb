/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type ConnectionDocument = HydratedDocument<Connection>;

@Schema()
export class Connection {
    @Prop()
    connection_id: number;
    @Prop()
    user_id: number;

    @Prop()
    username: string;

    @Prop()
    connection_user_id: number;

    @Prop()
    connection_status: string;
}


export const ConnectionSchema = SchemaFactory.createForClass(Connection);