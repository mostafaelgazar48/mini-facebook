import { UserDto } from "../../user/dto/user.dto";

export class PostDto {
  id:string;
  text:string;
  image:string;
  owner:UserDto;
}