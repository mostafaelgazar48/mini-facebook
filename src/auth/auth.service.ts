import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { CreatUserDto } from "../user/dto/creatUser.dto";
import { UserDto } from "../user/dto/user.dto";
import { RegistrationStatus } from "./registeration.status";
import { JwtPayload } from "./jwt.payload";
import { LoginDto } from "../user/dto/login.dto";
import { LoginStatus } from "./login.status";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private jwtService: JwtService) {
  }

  async register(userDto: CreatUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: "user registered successfully"
    };
    try {
      await this.userService.register(userDto);
    } catch (error) {
      status = {
        success: false,
        message: error
      };
    }
    return status;
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    return user;
  }


  async login(loginDto: LoginDto): Promise<LoginStatus> {

    // first get user
    const user = await this.userService.findByLogin(loginDto);
    const { expiresIn, token } = this.generatToken(user);

    return {
      username: user.username,
      token,
      expiresIn,
    };
  }

  private generatToken({ username }: UserDto): any {
    const user: JwtPayload = { username };
    const token = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      token
    };
  }
}

