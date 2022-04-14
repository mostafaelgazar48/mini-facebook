import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "./entity/post.entity";
import { AuthModule } from "../auth/auth.module";
import { UserEntity } from "../user/entity/user.entity";
import { UserService } from "../user/user.service";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PostEntity, UserEntity])],
  controllers: [PostsController],
  providers: [PostsService,UserService],
})
export class PostsModule {
}
