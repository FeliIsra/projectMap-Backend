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

  async findUserProjects(owner: string) {
    const projects = await this.projectModel.find({ owner });
    return projects;
  }

  async getOne(id: string) {
    return this.projectModel
      .findById(id)
      .populate(['owner', 'sharedUsers'])
      .exec();
  }

  async create(newProject: ProjectDto) {
    const project = new this.projectModel(newProject);
    const projectCreadted = await project.save();
    return projectCreadted;
  }

  async shareProject(id: string, userIds: string[]) {
    const project = await this.projectModel.findById(id);
    const users = await Promise.all(
      userIds.map((userId) => this.userService.findById(userId)),
    );
    await project.sharedUsers.push(...users);
    return await new this.projectModel(project).save();
  }

  async removeUserFromProject(id: string, userId: string) {
    const project: Project = await this.projectModel.findById(id);
    const newSharedUsers = project.sharedUsers.map((sharedUser) => {
      if (sharedUser._id.toString() != userId) return sharedUser;
    });
    project.sharedUsers = newSharedUsers;
    return await new this.projectModel(project).save();
  }
  async findSharedProjects(userId: string) {
    const projects = await this.projectModel.find({ sharedUsers: userId });
    return projects;
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
