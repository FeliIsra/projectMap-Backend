import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FactorDTO, PestelDTO } from './pestel.dto';
import { Pestel, PestelWithValues } from './pestel.type';
import {
  mapImportanciaToValue,
  mapIntensidadToValue,
  mapTendenciaToValue,
} from './utils/mapEnumsToValues';
import { SituacionDelMercado } from '../ansoff/situacionDelMercado';
import { SituacionDelProducto } from '../ansoff/situacionDelProducto';
import { Exito } from '../ansoff/exito';
import { Area, Importancia, Intensidad, Tendencia } from './enums';

@Injectable()
export class PestelService {
  constructor(@InjectModel('PESTEL') private pestelModel: Model<Pestel>) {}

  async getAll() {
    const pestels = await this.pestelModel.find();
    return pestels.map((pestel) => {
      const pestelObject = pestel.toObject();
      return this.mapToValues(pestelObject);
    });
  }

  async getAllByProjectId(projectId: string) {
    const pestels = await this.pestelModel.find({ projectId });
    return pestels.map((pestel) => {
      const pestelObject = pestel.toObject();
      return this.mapToValues(pestelObject);
    });
  }

  async getOne(id: string) {
    const pestel = await this.pestelModel.findById(id);
    return this.mapToValues(pestel);
  }

  async insertFactor(id: string, factor: FactorDTO) {
    const pestel = await this.pestelModel.findById(id);
    const pestelObject = pestel.toObject();
    const factores = pestelObject.factores;
    factores.push(factor);
    return this.pestelModel.findOneAndUpdate({ _id: id }, { factores });
  }

  async create(newPestel: PestelDTO) {
    const pestel = new this.pestelModel(newPestel);
    const pestelCreadted = await pestel.save();
    return pestelCreadted;
  }

  async update(id: string, updated: PestelDTO) {
    console.log(updated);
    return this.pestelModel.findOneAndUpdate({ _id: id }, updated);
  }

  async delete(id: string) {
    return this.pestelModel.deleteOne({ _id: id });
  }

  async deleteFactor(id: string, idFactor: string) {
    const pestel = await this.pestelModel.findById(id);
    const pestelObject = pestel.toObject();
    const factores = pestelObject.factores.filter(
      (factor) => factor._id != idFactor,
    );
    return this.pestelModel.findOneAndUpdate({ _id: id }, { factores });
  }

  private mapToValues(pestel: any): PestelWithValues {
    pestel.factores = pestel?.factores?.map((factor) => {
      factor.importancia = mapImportanciaToValue(factor.importancia);
      factor.intensidad = mapIntensidadToValue(factor.intensidad);
      factor.tendencia = mapTendenciaToValue(factor.tendencia);
      factor.puntuacion =
        factor.importancia * factor.intensidad * factor.tendencia;
      return factor;
    });
    return pestel;
  }

  async getOptions() {
    return {
      ['area']: Object.values(Area),
      ['importancia']: Object.values(Importancia),
      ['intesidad']: Object.values(Intensidad),
      ['tendencia']: Object.values(Tendencia),
    };
  }
}
