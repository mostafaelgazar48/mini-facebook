import { Body, Controller, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreatUserDto } from "../user/dto/creatUser.dto";
import { RegistrationStatus } from "./registeration.status";
import { LoginStatus } from "./login.status";
import { LoginDto } from "../user/dto/login.dto";
import { ApiTags } from "@nestjs/swagger";
@ApiTags('Auth')

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {
  }

  @Post("register")
  @UsePipes(new ValidationPipe())
  public async register(@Body() createUserDto: CreatUserDto): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(createUserDto);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post("login")
  @UsePipes(new ValidationPipe())
  public async login(@Body() loginDto: LoginDto): Promise<LoginStatus> {
    const user = await this.authService.login(loginDto);
    return user;
  }

}
