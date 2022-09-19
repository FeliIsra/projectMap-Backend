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
    return this.consultoraModel.findById(consultoraId);
  }
  async create(consultoraDto: ConsultoraDto) {
    return new this.consultoraModel(consultoraDto).save();
  }

  async update(consultoraId: string, consultoraDto: ConsultoraDto) {
    const consultora: Consultora = await this.consultoraModel.findById(
      consultoraId,
    );
    consultora.admin = consultoraDto.admin;
    return new this.consultoraModel(consultora).save();
  }

  async delete(consultoraId: string) {
    return this.consultoraModel.findByIdAndDelete(consultoraId);
  }

  async assignNewConsultor(consultoraId: string, userId: string) {
    const consultora: Consultora = await this.consultoraModel.findById(
      consultoraId,
    );

    const user = await this.userService.assignConsultora(userId, consultoraId);

    return user;
  }

  async removeConsultor(consultoraId: string, userId: string) {
    const user = await this.userService.removeConsultor(userId, consultoraId);

    return user;
  }
}
