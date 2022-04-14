import { Injectable, NotFoundException } from "@nestjs/common";
import { PostEntity } from "./entity/post.entity";
import { PostCreateDto } from "./dto/postCreate.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "../user/dto/user.dto";
import { UserService } from "../user/user.service";
import { PaginationQueryDro } from "./dto/pagination-query.dro";

@Injectable()
export class PostsService {
  constructor(@InjectRepository(PostEntity) private PostReository: Repository<PostEntity>, private readonly userService: UserService) {
  }

  async getAllPosts(
    paginationQuery: PaginationQueryDro
  ): Promise<PostEntity[]> {
    const { offset, limit } = paginationQuery;
    return await this.PostReository.find({ relations: ["owner"], skip: offset, take: limit });

  }

  async findPost(id: string, user): Promise<PostEntity> {
    const post = await this.PostReository.findOne({
      where: { id, owner: user }
    })
    if (!post) {
      throw new NotFoundException("post not found");
    }
    return post;
  }

  async createPost(createPostDto: PostCreateDto, user: UserDto) {
    const { username } = user;
    const { text, image } = createPostDto;
    const owner = await this.userService.findOne({ where: { username } });
    const post = await this.PostReository.create({ text, image, owner });
    return await this.PostReository.save(post);
  }

}
