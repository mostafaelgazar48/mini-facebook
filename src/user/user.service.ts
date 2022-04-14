import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import { find } from "rxjs";
import { UserDto } from "./dto/user.dto";
import { options } from "tsconfig-paths/lib/options";
import { toUserDto } from "../shared/maper";
import { LoginDto } from "./dto/login.dto";
import { compare } from "bcrypt";
import { CreatUserDto } from "./dto/creatUser.dto";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {

  }


  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepository.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({ username, password }: LoginDto): Promise<UserDto> {
    const user:UserEntity = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
    }
    // validate username with the password

    const valid = await compare(password,user.password);
    console.log(valid);
    if (!valid) {
      throw new HttpException(" invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);

  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({
      where: { username }
    });
  }

  async register(userDto: CreatUserDto): Promise<UserDto> {

    const { username, password, phone } = userDto;
    const exist = await this.userRepository.findOne({ where: { username } });
    if (exist) {
      throw new HttpException("Username already in use", HttpStatus.BAD_REQUEST);
    }
    const user: UserEntity = await this.userRepository.create({ username, password, phone });
    await this.userRepository.save(user);
    return toUserDto(user);

  }

}
