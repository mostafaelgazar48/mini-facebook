import {
  Body, ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req, UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { PostListDto } from "./dto/postList.dto";
import { PostsService } from "./posts.service";
import { PostEntity } from "./entity/post.entity";
import { PostCreateDto } from "./dto/postCreate.dto";
import { AuthGuard } from "@nestjs/passport";
import { UserDto } from "../user/dto/user.dto";
import { GetUser } from "../auth/getuser.decorator";
import { UserEntity } from "../user/entity/user.entity";
import { ApiBearerAuth, ApiForbiddenResponse, ApiTags } from "@nestjs/swagger";
import { PaginationQueryDro } from "./dto/pagination-query.dro";
import { FileInterceptor } from "@nestjs/platform-express";
import { I18n, I18nContext } from "nestjs-i18n";

@ApiTags("Posts")
@Controller("api/posts")
export class PostsController {
  constructor(private readonly postService: PostsService) {
  }

  @Get()
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Query() paginationQuery: PaginationQueryDro): Promise<PostEntity[]> {
    return this.postService.getAllPosts(paginationQuery);
  }

  @ApiTags("test language route")
  @Get("/lang")
  async getHello(@I18n() i18n: I18nContext) {
    return await i18n.t("test.HELLO");
  }

  @Get("/:id")
  @UseGuards(AuthGuard())
  async findPost(@Param("id") id: string, @GetUser() user: UserEntity): Promise<PostEntity> {
    return this.postService.findPost(id, user);
  }

  @Post()
  @UseGuards(AuthGuard(""))
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor("image", {
      dest: "./uploads"
    }))
  async createPost(@Body() createPostDto: PostCreateDto, @GetUser() user: UserEntity, @UploadedFile() file) {
    createPostDto.image = file.filename;
    await this.postService.createPost(createPostDto, user);
  }


}
