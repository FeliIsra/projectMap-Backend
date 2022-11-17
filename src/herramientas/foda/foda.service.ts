import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Area, Importancia, Intensidad, Tendencia, Urgencia } from './enums';
import { FactorDto, FodaDto } from './foda.dto';
import { Factor, FodaDocument } from './foda.schema';
import { FodaPreSeed } from './foda.type';
import { Trend } from '../balancedScorecard/trends';

@Injectable()
export class FodaService {
  constructor(
    @InjectModel('FODA') private fodaModel: Model<FodaDocument>,
    @InjectModel('FODAPreSeed') private preSeedModel: Model<FodaPreSeed>,
  ) {}

  async getPreSeeds() {
    const preSeeds = await this.preSeedModel.find({});
    const preSeedsFormated = {};

    preSeeds.forEach((preSeed) => {
      const { area, descripcion, consejo } = preSeed;
      const list = preSeedsFormated[area];
      if (!list) preSeedsFormated[area] = [];
      preSeedsFormated[area].push({ descripcion, consejo });
    });

    return preSeedsFormated;
  }

  async getOptions() {
    return {
      importancia: Object.values(Importancia),
      intensidad: Object.values(Intensidad),
      tendencia: Object.values(Tendencia),
      urgencia: Object.values(Urgencia),
    };
  }

  async getAllByProjectId(projectId) {
    return this.fodaModel
      .find({ projectId: projectId })
      .sort({ createdAt: 'desc' })
      .exec();
  }

  async getOne(id: string) {
    return this.fodaModel.findById(id);
  }

  async insertFactor(id: string, factorDto: FactorDto) {
    const foda = await this.fodaModel.findById(id);
    const factor = new Factor(
      factorDto.descripcion,
      factorDto.area as Area,
      factorDto.importancia as Importancia,
      factorDto.intensidad as Intensidad,
      factorDto.tendencia as Tendencia,
      factorDto.urgencia as Urgencia,
    );
    foda.factores.push(factor);
    await new this.fodaModel(foda).save();
    return this.getOne(id);
  }

  async insertPreSeed(preSeedDTO) {
    const preSeed = new this.preSeedModel(preSeedDTO);
    const preSeedCreated = await preSeed.save();
    return preSeedCreated;
  }

  async create(newFoda: FodaDto) {
    const foda = new this.fodaModel(newFoda);
    const fodaCreadted = await foda.save();
    return fodaCreadted;
  }

  async update(id: string, updated: FodaDto) {
    const foda = await this.fodaModel.findById(id);
    foda.titulo = updated.titulo;

    return new this.fodaModel(foda).save();
  }

  async delete(id: string) {
    const result = await this.fodaModel.deleteOne({ _id: id });
    if (result.deletedCount) return id;
    else throw new HttpException('Foda not found', HttpStatus.NOT_FOUND);
  }

  async deleteFactor(id: string, idFactor: string) {
    const foda = await this.fodaModel.findById(id);
    const fodaObject = foda.toObject();
    const factores = fodaObject.factores.filter(
      (factor) => factor._id.toString() != idFactor,
    );

    foda.factores = factores;
    await new this.fodaModel(foda).save();
    return this.getOne(id);
  }

  async updateFactor(id: string, idFactor: string, updatedFactor: FactorDto) {
    const foda = await this.fodaModel.findById(id).then((foda) => {
      const factor = foda.factores.find(
        (factor) => factor._id.toString() == idFactor,
      );
      if (updatedFactor.area) factor.area = updatedFactor.area as Area;
      if (updatedFactor.importancia)
        factor.importancia = updatedFactor.importancia as Importancia;
      if (updatedFactor.intensidad)
        factor.intensidad = updatedFactor.intensidad as Intensidad;
      if (updatedFactor.tendencia)
        factor.tendencia = updatedFactor.tendencia as Tendencia;
      if (updatedFactor.urgencia)
        factor.urgencia = updatedFactor.urgencia as Urgencia;
      if (updatedFactor.descripcion)
        factor.descripcion = updatedFactor.descripcion;
      return foda.save();
    });
    return foda;
  }
}
