import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Consultora } from './consultora.schema';
import { Model } from 'mongoose';
import { ConsultoraDto } from './consultora.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { Roles } from '../user/user.roles';
import { ProjectService } from '../project/project.service';

@Injectable()
export class ConsultoraService {
  constructor(
    @InjectModel(Consultora.name) private consultoraModel: Model<Consultora>,
    private userService: UserService,
    private projectService: ProjectService,
  ) {}

  async findById(consultoraId: string) {
    const consultora = await this.consultoraModel
      .findById(consultoraId)
      .populate(['admin', 'projects', 'consultants'])
      .exec();

    if (!consultora)
      throw new HttpException('Consultora doesnt exists', HttpStatus.NOT_FOUND);

    return consultora;
  }
  async create(consultoraDto: ConsultoraDto) {
    const consultora = await new this.consultoraModel(consultoraDto).save();
    return this.findById(consultora._id.toString());
  }

  async update(consultoraId: string, consultoraDto: ConsultoraDto) {
    const consultora: Consultora = await this.consultoraModel.findById(
      consultoraId,
    );
    consultora.name = consultoraDto.name;
    await new this.consultoraModel(consultora).save();
    return this.findById(consultoraId);
  }

  async delete(consultoraId: string) {
    return this.consultoraModel.findByIdAndDelete(consultoraId);
  }

  async assignNewConsultant(consultoraId: string, userEmail: string) {
    const consultora: Consultora = await this.consultoraModel.findById(
      consultoraId,
    );

    const user = await this.userService
      .findUserByEmail(userEmail)
      .then((user) => {
        this.checkUserIsConsultant(user);
        return this.userService.assignConsultora(
          user._id.toString(),
          consultoraId,
        );
      });

    consultora.consultants.push(user);

    await new this.consultoraModel(consultora).save();
    return this.findById(consultoraId);
  }

  async removeConsultor(consultoraId: string, userEmail: string) {
    const consultora: Consultora = await this.consultoraModel.findById(
      consultoraId,
    );

    const user = await this.userService
      .findUserByEmail(userEmail)
      .then((user) => {
        this.checkUserIsConsultant(user);
        return this.userService.removeConsultant(user._id.toString());
      });

    consultora.consultants = consultora.consultants.filter(
      (consultant) => consultant._id.toString() != user._id.toString(),
    );

    await new this.consultoraModel(consultora).save();

    return this.findById(consultoraId);
  }

  async assignProjectsToConsultant(
    consultoraId: string,
    userEmail: string,
    projectIds: string[],
  ) {
    const consultora: Consultora = await this.consultoraModel.findById(
      consultoraId,
    );

    this.checkProjectsBelongToConsultora(projectIds, consultora);

    const projects = await Promise.all(
      projectIds.map((projectId) => this.projectService.getOne(projectId)),
    );

    await this.userService.findUserByEmail(userEmail).then((user) => {
      this.checkUserIsConsultant(user);

      return this.userService.replaceAssignProjects(
        user._id.toString(),
        projects,
      );
    });

    return this.findById(consultoraId);
  }

  async removeProjectsToConsultant(
    consultoraId: string,
    userEmail: string,
    projects: string[],
  ) {
    const consultora: Consultora = await this.findById(consultoraId);
    this.checkProjectsBelongToConsultora(projects, consultora);

    await this.userService.findUserByEmail(userEmail).then((user) => {
      this.checkUserIsConsultant(user);

      return this.userService.removeProjects(user._id.toString(), projects);
    });

    return this.findById(consultoraId);
  }

  async assignNewAdmin(consultoraId: string, userEmail: string) {
    const consultora = await this.consultoraModel.findById(consultoraId);

    const user: User = await this.userService
      .findUserByEmail(userEmail)
      .then((user) =>
        this.userService.assignConsultora(user._id.toString(), consultoraId),
      );

    consultora.admin = user;

    await new this.consultoraModel(consultora).save();
    return this.findById(consultoraId);
  }

  async removeAdmin(consultoraId: string) {
    const consultora: Consultora = await this.consultoraModel.findById(
      consultoraId,
    );

    consultora.admin = undefined;

    await new this.consultoraModel(consultora).save();
    return this.findById(consultoraId);
  }

  async addProject(consultoraId: string, projectId: string) {
    await this.consultoraModel.findByIdAndUpdate(consultoraId, {
      $push: { projects: projectId },
    });

    return this.findById(consultoraId);
  }

  async removeProject(consultoraId: string, projectId: string) {
    await this.consultoraModel.findByIdAndUpdate(consultoraId, {
      $pull: { projects: projectId },
    });
    return this.findById(consultoraId);
  }

  private checkUserIsConsultant(user: User) {
    if (user.role && !Roles.isConsultor(user))
      throw new HttpException('User is not consultant', HttpStatus.BAD_REQUEST);
  }

  private checkProjectsBelongToConsultora(
    projects: string[],
    consultora: Consultora,
  ) {
    if (
      !projects.every((projectId) =>
        consultora.projects
          .map((project) => project._id.toString())
          .includes(projectId),
      )
    )
      throw new HttpException(
        'Projects must belong to consultora',
        HttpStatus.BAD_REQUEST,
      );
  }
}
