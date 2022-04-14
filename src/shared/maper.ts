import { PostEntity } from "../posts/entity/post.entity";
import { PostDto } from "../posts/dto/post.dto";
import { UserEntity } from "../user/entity/user.entity";
import { UserDto } from "../user/dto/user.dto";

export const toPostDto = (data: PostEntity): PostDto => {
  const { id, text, image, owner } = data;

  let toPostDto: PostDto = { id, text, image, owner };
  return toPostDto;
};


export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, phone } = data;
  let userDto: UserDto = { id, username, phone };
  return userDto;
};
