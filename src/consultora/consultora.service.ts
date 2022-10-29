import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Consultora } from './consultora.schema';
import { Model } from 'mongoose';
import { ConsultoraDto } from './consultora.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';

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
    return new this.consultoraModel(consultora).save();
  }

  async delete(consultoraId: string) {
    return this.consultoraModel.findByIdAndDelete(consultoraId);
  }

  async assignNewConsultor(consultoraId: string, userEmail: string) {
    const consultora: Consultora = await this.consultoraModel.findById(
      consultoraId,
    );

    const user = await this.userService
      .findUserByEmail(userEmail)
      .then((user) =>
        this.userService.assignConsultora(user._id.toString(), consultoraId),
      );

    consultora.consultants.push(user);

    return new this.consultoraModel(consultora).save();
  }

  async removeConsultor(consultoraId: string, userEmail: string) {
    const consultora: Consultora = await this.consultoraModel.findById(
      consultoraId,
    );

    const user = await this.userService
      .findUserByEmail(userEmail)
      .then((user) =>
        this.userService.removeConsultor(user._id.toString(), consultoraId),
      );

    consultora.consultants = consultora.consultants.filter(
      (consultant) => consultant._id.toString() != user._id.toString(),
    );

    return new this.consultoraModel(consultora).save();
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
}
