/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Connection {
  @PrimaryGeneratedColumn()
  connection_id:number;
  @Column({
    type:'int'
  })
  user_id:number;

@Column({
  type: 'int'
})
connection_user_id:number;

@Column({
  type: 'enum',
  enum:['followed','connected','pending']
})
connection_status:string;
}