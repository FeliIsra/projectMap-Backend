import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PorterDto } from './porter.dto';
import { Porter, PorterDocument } from './porter.schema';
import { Fuerza } from './fuerza';
import { NivelDeConcordancia } from './nivelDeConcordancia';
import { Valoracion } from './valoracion';
import { Ansoff } from '../ansoff/ansoff.schema';

@Injectable()
export class PorterService {
  constructor(
    @InjectModel(Porter.name) private porterModel: Model<PorterDocument>,
  ) {}

  async create(porterDto: PorterDto) {
    const porter = new this.porterModel(porterDto);
    return porter.save();
  }

  async getOptions() {
    return {
      ['fuerza']: Object.values(Fuerza),
      ['nivelDeConcordancia']: Object.values(NivelDeConcordancia),
      ['valoracion']: Object.values(Valoracion),
    };
  }

  async findById(id: string) {
    return this.porterModel
      .findOne({
        _id: id,
      })
      .exec();
  }

  async getAllByProjectId(projectId: string) {
    return this.porterModel.find({ projectId: projectId }).exec();
  }
}
