import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDto } from './project.dto';
import { Project } from './project.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project') private projectModel: Model<Project>,
    private userService: UserService,
  ) {}

  async getOne(id: string) {
    return this.projectModel.findById(id).populate(['owner']).exec();
  }

  async getSharedUsers(projectId: string) {
    return this.userService.findUsersBySharedProject(projectId);
  }

  async create(newProject: ProjectDto) {
    return new this.projectModel(newProject).save();
  }

  async shareProject(id: string, userIds: string[]) {
    const project = await this.getOne(id);
    await Promise.all(
      userIds.map((userId) =>
        this.userService.assignProjects(userId, [project]),
      ),
    );
    return this.getSharedUsers(id);
  }

  async shareProjectByEmail(id: string, email: string) {
    const project = await this.getOne(id);
    const user = await this.userService.findUserByEmail(email);
    await this.userService.assignProjects(user._id.toString(), [project]);
    return this.getSharedUsers(id);
  }

  async removeUserFromProjectByEmail(id: string, emails: string[]) {
    const users = await Promise.all(
      emails.map((email) => this.userService.findUserByEmail(email)),
    );
    await Promise.all(
      users.map((user) =>
        this.userService.removeProjects(user._id.toString(), [id]),
      ),
    );
    return this.getSharedUsers(id);
  }

  async removeUserFromProject(id: string, userId: string) {
    await this.userService.removeProjects(userId, [id]);
    return this.getSharedUsers(id);
  }

  async findUserProjects(owner: string) {
    return this.projectModel.find({ owner });
  }

  async findSharedProjects(userId: string) {
    const user = await this.userService.findById(userId);
    return user.sharedProjects;
  }
  async update(id: string, updated: ProjectDto) {
    return this.projectModel.findOneAndUpdate({ _id: id }, updated);
  }

  async delete(id: string) {
    const users = await this.getSharedUsers(id);

    await Promise.all(
      users.map((user) =>
        this.userService.removeProjects(user._id.toString(), [id]),
      ),
    );
    const result = await this.projectModel.deleteOne({ _id: id });
    if (result.deletedCount) return id;
    else throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
  }
}
