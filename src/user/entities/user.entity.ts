/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id:number;
  @Column({
    type: 'varchar',
    length:'26'
  })
  name:string;
  @Column({
    type:'varchar',
    length:'15'
  })
  username:string;
@Column({
  type: 'varchar',
  length:'40'
})
email:string;
@Column({
  type: 'int'
})
age:number;
@Column({
  type: 'varchar',
  length:'15'
})
password:string;
@Column({
  type:'enum' ,
  enum:['m','f','t']
})
gender: string;
}