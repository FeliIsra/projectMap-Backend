import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDTO } from './project.dto';
import { Project } from './project.type';

@Injectable()
export class ProjectService {
  constructor(@InjectModel('Project') private projectModel: Model<Project>) {}

  async getAll() {
    const projects = await this.projectModel.find();
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

  async update(id: string, updated: ProjectDTO) {
    return this.projectModel.findOneAndUpdate({ _id: id }, updated);
  }

  async delete(id: string) {
    return this.projectModel.deleteOne({ _id: id });
  }
}
