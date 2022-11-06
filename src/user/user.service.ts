import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { Roles } from './user.roles';
import { ProjectService } from '../project/project.service';
import { ProjectAssignedNotification } from '../notifications/ProjectAssignedNotification';
import { Project } from '../project/project.schema';

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
    if (!user)
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) return this.sanitizeUser(user);
    else throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
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
    return this.userModel
      .findById(id)
      .populate(['sharedProjects', 'consultora']);
  }

  async updateRole(userId: string, role: Roles) {
    const user: User = await this.userModel.findById(userId);
    user.role = role;
    return new this.userModel(user).save();
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return user;
  }

  async assignConsultora(userId: string, consultoraId: string) {
    await this.userModel
      .findByIdAndUpdate(userId, {
        consultora: consultoraId,
      })
      .exec();

    return this.userModel.findById(userId);
  }

  async assignProjects(userId: string, projects: Project[]) {
    const projectIds = projects.map((project) => project._id.toString());
    const user = await this.userModel.findByIdAndUpdate(userId, {
      $push: { sharedProjects: projectIds },
    });

    projects.forEach((project) =>
      new ProjectAssignedNotification(project).notifyUsers([user.email]),
    );

    return user;
  }

  async removeProjects(userId: string, projectIds: string[]) {
    const user = await this.findById(userId);

    user.sharedProjects = user.sharedProjects.filter(
      (project) => !projectIds.includes(project._id.toString()),
    );
    return new this.userModel(user).save();
  }

  async removeConsultant(userId: string) {
    return this.userModel.findByIdAndUpdate(userId, {
      $unset: { consultora: 1 },
    });
  }

  async findUsersBySharedProject(projectId: string) {
    return this.userModel.find({ sharedProjects: projectId });
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
