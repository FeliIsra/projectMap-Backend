import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { McKinsey, MckinseyDocument } from './mckinsey.schema';
import { McKinseyDto, UnidadDeNegocioDto } from './mckinsey.dto';

@Injectable()
export class MckinseyService {
  constructor(
    @InjectModel(McKinsey.name) private mckinseyModel: Model<MckinseyDocument>,
  ) {}

  async create(mckinseyDto: McKinseyDto) {
    const mckinsey = new this.mckinseyModel(mckinseyDto);
    return mckinsey.save();
  }

  async findById(porterId: string) {
    return this.mckinseyModel.findOne({ _id: porterId }).exec();
  }

  async editUnidadDeNegocio(
    porterId: string,
    unidadDeNegocioId: string,
    unidadDeNegocioDto: UnidadDeNegocioDto,
  ) {
    const mcKinsey: McKinsey = await this.mckinseyModel
      .findOne({ _id: porterId })
      .exec();
    mcKinsey.unidadesDeNegocio = mcKinsey.unidadesDeNegocio.map(
      (unidadDeNegocio) => {
        if (unidadDeNegocio._id.toString() == unidadDeNegocioId) {
          unidadDeNegocio.fuerzaCompetitiva =
            unidadDeNegocioDto.fuerzaCompetitiva;
          unidadDeNegocio.atractivoDeMercado =
            unidadDeNegocioDto.atractivoDeMercado;
          return unidadDeNegocio;
        }
        return unidadDeNegocio;
      },
    );
    return new this.mckinseyModel(mcKinsey).save();
  }

  async getAllByProjectId(projectId: string) {
    return this.mckinseyModel.find({ projectId: projectId }).exec();
  }
}
