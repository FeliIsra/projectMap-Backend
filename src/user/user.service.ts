import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, UserDTO } from './user.dto';
import { User } from './user.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(userDTO: CreateUserDTO) {
    await this.validate(userDTO);
    const createUser = new this.userModel(userDTO);
    await createUser.save();

    return this.sanitizeUser(createUser);
  }

  async findByLogin(UserDTO: UserDTO) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async findByPayload(payload: { email: string }) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }

  async validate(newUser: CreateUserDTO) {
    const { email, password, confirmPassword } = newUser;
    if (password !== confirmPassword)
      throw new HttpException('Passwords not match', HttpStatus.BAD_REQUEST);

    const user = await this.userModel.findOne({ email });
    if (user)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
  }
}
