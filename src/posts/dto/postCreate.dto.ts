import { IsNotEmpty, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export  class PostCreateDto {
   @IsNotEmpty()
   @MaxLength(100)
   @ApiProperty({description:'the post body'})
   text:string;

   @ApiProperty({description:'post image'})
   image:string;
}
