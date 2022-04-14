import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({description:'username '})
  readonly username: string;
  @IsNotEmpty()
  @ApiProperty({description:'user password '})

  readonly password: string;
}