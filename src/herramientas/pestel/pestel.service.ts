import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FactorDto, PestelDto } from './pestel.dto';
import { PestelPreSeed } from './pestel.type';
import { Area, Importancia, Intensidad, Tendencia } from './enums';
import { Factor, Pestel } from './pestel.schema';

@Injectable()
export class PestelService {
  constructor(
    @InjectModel(Pestel.name) private pestelModel: Model<Pestel>,
    @InjectModel('PESTELPreSeed') private preSeedModel: Model<PestelPreSeed>,
  ) {}

  async getAll() {
    return this.pestelModel.find();
  }

  async getPreSeeds() {
    const preSeeds = await this.preSeedModel.find({});
    const preSeedsFormated = {};

    preSeeds.forEach((preSeed) => {
      const { area, descripcion, consejoPositivo, consejoNegativo, puntaje } =
        preSeed;
      const list = preSeedsFormated[area];
      if (!list) preSeedsFormated[area] = [];
      preSeedsFormated[area].push({
        descripcion,
        consejoPositivo,
        consejoNegativo,
        puntaje,
      });
    });

    return preSeedsFormated;
  }

  async insertPreSeed(preSeedDTO) {
    const preSeed = new this.preSeedModel(preSeedDTO);
    const preSeedCreated = await preSeed.save();
    return preSeedCreated;
  }

  async getAllByProjectId(projectId: string) {
    return this.pestelModel
      .find({ projectId })
      .sort({ createdAt: 'desc' })
      .exec();
  }

  async getOne(id: string) {
    return this.pestelModel.findById(id);
  }

  async insertFactor(id: string, factorDto: FactorDto) {
    const pestel = await this.pestelModel.findById(id);
    const factor = new Factor(
      factorDto.descripcion,
      factorDto.area,
      factorDto.importancia,
      factorDto.intensidad,
      factorDto.tendencia,
    );
    pestel.factores.push(factor);

    await new this.pestelModel(pestel).save();
    return this.pestelModel.findById(id);
  }

  async editFactor(id: string, idFactor: string, updatedFactor: FactorDto) {
    const pestel = await this.pestelModel.findById(id).then((pestel) => {
      const factor = pestel.factores.find(
        (factor) => factor._id.toString() == idFactor,
      );
      if (updatedFactor.area) factor.area = updatedFactor.area as Area;
      if (updatedFactor.importancia)
        factor.importancia = updatedFactor.importancia as Importancia;
      if (updatedFactor.intensidad)
        factor.intensidad = updatedFactor.intensidad as Intensidad;
      if (updatedFactor.tendencia)
        factor.tendencia = updatedFactor.tendencia as Tendencia;
      if (updatedFactor.descripcion)
        factor.descripcion = updatedFactor.descripcion;
      return pestel.save();
    });
    return pestel;
  }

  async create(newPestel: PestelDto) {
    const pestel = new this.pestelModel(newPestel);
    const pestelCreadted = await pestel.save();
    return pestelCreadted;
  }

  async update(id: string, updated: PestelDto) {
    await this.pestelModel.findOneAndUpdate({ _id: id }, updated);
    return this.pestelModel.findById(id);
  }

  async delete(id: string) {
    const result = await this.pestelModel.deleteOne({ _id: id });
    if (result.deletedCount) return id;
    else throw new HttpException('Pestel not found', HttpStatus.NOT_FOUND);
  }

  async deleteFactor(id: string, idFactor: string) {
    const pestel = await this.pestelModel.findById(id).exec();
    const factores = pestel.factores.filter(
      (factor) => factor._id.toString() != idFactor,
    );
    await this.pestelModel.findOneAndUpdate({ _id: id }, { factores });
    return this.pestelModel.findById(id);
  }

  async getOptions() {
    return {
      area: Object.values(Area),
      importancia: Object.values(Importancia),
      intensidad: Object.values(Intensidad),
      tendencia: Object.values(Tendencia),
    };
  }
}
