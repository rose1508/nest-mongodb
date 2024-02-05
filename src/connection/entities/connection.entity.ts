/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn,ManyToOne } from "typeorm";
import { User } from "src/user/entities/user.entity";
@Entity()
export class Connection {
  @PrimaryGeneratedColumn()
  connection_id:number;
  @Column({
    type:'int'
  })
  user_id:number;

  @Column()
  username:string;

  @ManyToOne(() => User, (user) => user.connections)
  user: User;
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