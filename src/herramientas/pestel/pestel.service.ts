import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FactorDto, PestelDto } from './pestel.dto';
import { Pestel, PestelPreSeed, PestelWithValues } from './pestel.type';
import {
  mapImportanciaToValue,
  mapIntensidadToValue,
  mapTendenciaToValue,
} from './utils/mapEnumsToValues';
import { Area, Importancia, Intensidad, Tendencia } from './enums';

@Injectable()
export class PestelService {
  constructor(
    @InjectModel('PESTEL') private pestelModel: Model<Pestel>,
    @InjectModel('PESTELPreSeed') private preSeedModel: Model<PestelPreSeed>,
  ) {}

  async getAll() {
    const pestels = await this.pestelModel.find();
    return pestels.map((pestel) => {
      const pestelObject = pestel.toObject();
      return this.mapToValues(pestelObject);
    });
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
    const pestels = await this.pestelModel.find({ projectId }).exec();
    return pestels.map((pestel) => this.mapToValues(pestel));
  }

  async getOne(id: string) {
    const pestel = await this.pestelModel.findById(id);
    return this.mapToValues(pestel);
  }

  async insertFactor(id: string, factor: FactorDto) {
    let pestel = await this.pestelModel.findById(id);
    const pestelObject = pestel.toObject();
    const factores = pestelObject.factores;
    factores.push(factor);
    await this.pestelModel.findOneAndUpdate({ _id: id }, { factores });
    pestel = await this.pestelModel.findById(id);
    return this.mapToValues(pestel);
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
    await this.pestelModel.deleteOne({ _id: id });
    return this.pestelModel.findById(id);
  }

  async deleteFactor(id: string, idFactor: string) {
    const pestel = await this.pestelModel.findById(id);
    const pestelObject = pestel.toObject();
    const factores = pestelObject.factores.filter(
      (factor) => factor._id != idFactor,
    );
    await this.pestelModel.findOneAndUpdate({ _id: id }, { factores });
    return this.pestelModel.findById(id);
  }

  private mapToValues(pestel: any): PestelWithValues {
    pestel.factores = pestel?.factores?.map((factor) => {
      factor.puntuacion = this.getPuntuacion(factor);
      return factor;
    });
    return pestel;
  }

  private getPuntuacion(factor: any): number {
    const calcular = (_factor) => {
      const factor = _factor;
      const importancia = mapImportanciaToValue(
        factor.importancia,
        factor.area,
      );
      const intensidad = mapIntensidadToValue(factor.intensidad, factor.area);
      const tendencia = mapTendenciaToValue(factor.tendencia, factor.area);

      return importancia * intensidad * tendencia;
    };

    return calcular(factor);
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
