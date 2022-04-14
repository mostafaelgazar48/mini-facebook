import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";
import { UserDto } from "../../user/dto/user.dto";

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  text: string;
  @Column()
  image: string;
  @ManyToOne(type => UserEntity)
  owner?: UserEntity;
}