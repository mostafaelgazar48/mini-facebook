import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatUserDto {
  @ApiProperty({description:'the username'})
  @IsNotEmpty()
  username: string;

  @ApiProperty({description:'the user password'})
  @IsNotEmpty()
  password: string;

  @ApiProperty({description:'phone of user'})
  @IsNotEmpty()
  phone: string;

}