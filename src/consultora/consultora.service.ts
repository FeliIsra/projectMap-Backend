import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Consultora } from './consultora.schema';
import { Model } from 'mongoose';
import { ConsultoraDto } from './consultora.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { Roles } from '../user/user.roles';

@Injectable()
export class ConsultoraService {
  constructor(
    @InjectModel(Consultora.name) private consultoraModel: Model<Consultora>,
    private userService: UserService,
  ) {}

  async findById(consultoraId: string) {
    return this.consultoraModel
      .findById(consultoraId)
      .populate(['admin', 'projects', 'consultants'])
      .exec();
  }
  async create(consultoraDto: ConsultoraDto) {
    return new this.consultoraModel(consultoraDto).save();
  }

  async update(consultoraId: string, consultoraDto: ConsultoraDto) {
    const consultora: Consultora = await this.consultoraModel.findById(
      consultoraId,
    );
    consultora.name = consultoraDto.name;
    return new this.consultoraModel(consultora).save();
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

    return new this.consultoraModel(consultora).save();
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

    return new this.consultoraModel(consultora).save();
  }

  async assignProjectsToConsultant(
    consultoraId: string,
    userEmail: string,
    projects: string[],
  ) {
    const consultora: Consultora = await this.consultoraModel.findById(
      consultoraId,
    );

    this.checkProjectsBelongToConsultora(projects, consultora);

    return this.userService.findUserByEmail(userEmail).then((user) => {
      this.checkUserIsConsultant(user);

      return this.userService.assignProjects(user._id.toString(), projects);
    });
  }

  async removeProjectsToConsultant(
    consultoraId: string,
    userEmail: string,
    projects: string[],
  ) {
    const consultora: Consultora = await this.findById(consultoraId);
    this.checkProjectsBelongToConsultora(projects, consultora);

    return this.userService.findUserByEmail(userEmail).then((user) => {
      this.checkUserIsConsultant(user);

      return this.userService.removeProjects(user._id.toString(), projects);
    });
  }

  async assignNewAdmin(consultoraId: string, userEmail: string) {
    const consultora = await this.consultoraModel.findById(consultoraId);

    const user: User = await this.userService
      .findUserByEmail(userEmail)
      .then((user) =>
        this.userService.assignConsultora(user._id.toString(), consultoraId),
      );

    consultora.admin = user;
    consultora.consultants.push(user);

    return new this.consultoraModel(consultora).save();
  }

  async removeAdmin(consultoraId: string) {
    const consultora: Consultora = await this.consultoraModel.findById(
      consultoraId,
    );

    consultora.admin = undefined;

    return new this.consultoraModel(consultora).save;
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
