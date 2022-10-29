import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { Consultora } from '../consultora/consultora.schema';
import { use } from 'passport';
import { Roles } from './user.roles';
import { exec } from 'child_process';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(userDTO: CreateUserDto) {
    await this.validate(userDTO);
    const createUser = new this.userModel(userDTO);
    await createUser.save();

    return this.sanitizeUser(createUser);
  }

  async findByLogin(UserDTO: UserDto) {
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

  private sanitizeUser(user: User) {
    const sanitized = user;
    delete sanitized['password'];
    return sanitized;
  }

  async findByPayload(payload: { email: string }) {
    const { email } = payload;
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    return this.userModel.findById(id).populate(['projects', 'consultora']);
  }

  async updateRole(userId: string, role: Roles) {
    const user: User = await this.userModel.findById(userId);
    user.role = role;
    return new this.userModel(user).save();
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }

  async assignConsultora(userId: string, consultoraId: string) {
    const user: User = await this.userModel.findById(userId);

    if (!Roles.isConsultor(user))
      throw new HttpException('User is not consultant', HttpStatus.BAD_REQUEST);

    await this.userModel
      .findByIdAndUpdate(userId, {
        consultora: consultoraId,
      })
      .exec();

    return this.userModel.findById(userId);
  }

  async removeConsultor(userId: string, consultoraId: string) {
    const user: User = await this.userModel.findByIdAndUpdate(userId, {
      $unset: { consultora: 1 },
    });

    return this.userModel.findById(userId);
  }

  async validate(newUser: CreateUserDto) {
    const { email, password, confirmPassword } = newUser;
    if (password !== confirmPassword)
      throw new HttpException('Passwords not match', HttpStatus.BAD_REQUEST);

    const user = await this.userModel.findOne({ email });
    if (user)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
  }
}
