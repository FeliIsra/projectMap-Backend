import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDTO } from './project.dto';
import { Project } from './project.schema';

@Injectable()
export class ProjectService {
  constructor(@InjectModel('Project') private projectModel: Model<Project>) {}

  async findUserProjects(owner: string) {
    const projects = await this.projectModel.find({ owner });
    return projects;
  }

  async getOne(id: string) {
    const project = await this.projectModel.findById(id);
    return project;
  }

  async create(newProject: ProjectDTO) {
    const project = new this.projectModel(newProject);
    const projectCreadted = await project.save();
    return projectCreadted;
  }

  async shareProject(id: string, users: string[]) {
    const project = await this.projectModel.findById(id);
    project.sharedUsers.push(...users);
    return await new this.projectModel(project).save();
  }

  async removeUserFromProject(id: string, userId: string) {
    const project: Project = await this.projectModel.findById(id);
    const newSharedUsers = project.sharedUsers.map((sharedUser) => {
      if (sharedUser != userId) return sharedUser;
    });
    project.sharedUsers = newSharedUsers;
    return await new this.projectModel(project).save();
  }
  async findSharedProjects(userId: string) {
    const projects = await this.projectModel.find({ sharedUsers: userId });
    return projects;
  }
  async update(id: string, updated: ProjectDTO) {
    return this.projectModel.findOneAndUpdate({ _id: id }, updated);
  }

  async delete(id: string) {
    return this.projectModel.deleteOne({ _id: id });
  }
}
