import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {hash} from 'bcrypt';
import { Exclude } from "class-transformer";
@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({
    type: "varchar",
    nullable: false,
    unique: true
  })
  username: string;
  @Column({
    type: "varchar",
    nullable: false
  })
  @Exclude()
  password: string;
@Column()
  phone:string;
  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}