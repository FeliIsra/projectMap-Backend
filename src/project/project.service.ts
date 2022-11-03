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

  async create(newProject: ProjectDto) {
    return new this.projectModel(newProject).save();
  }

  async shareProject(id: string, userIds: string[]) {
    return Promise.all(
      userIds.map((userId) => this.userService.assignProjects(userId, [id])),
    );
  }

  async removeUserFromProject(id: string, userId: string) {
    return this.userService.removeProjects(userId, [id]);
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
    const result = await this.projectModel.deleteOne({ _id: id });
    if (result.deletedCount) return id;
    else throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
  }
}
