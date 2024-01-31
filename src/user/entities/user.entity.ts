/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from "typeorm";
import { Connection } from "src/connection/entities/connection.entity";
import { Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
@Entity('user')
@Unique(['email'])
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
  type: 'varchar'

})
password:string;
@Column({
  type:'enum' ,
  enum:['m','f','t']
})
gender: string;
@OneToMany(() => Connection, (connection) => connection.user)
  connections: Connection[];

  @BeforeInsert()  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);  
}
}
