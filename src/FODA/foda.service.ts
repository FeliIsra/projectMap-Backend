import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FactorDTO, FodaDTO } from './foda.dto';
import { Foda, FodaWithValues } from './foda.type';
import {
  mapImportanciaToValue,
  mapIntensidadToValue,
  mapTendenciaToValue,
} from './utils/mapEnumsToValues';

@Injectable()
export class FodaService {
  constructor(@InjectModel('FODA') private fodaModel: Model<Foda>) {}

  async getAll() {
    const fodas = await this.fodaModel.find();
    return fodas.map((foda) => {
      const fodaObject = foda.toObject();
      return this.mapToValues(fodaObject);
    });
  }

  async getOne(id: string) {
    const foda = await this.fodaModel.findById(id);
    return this.mapToValues(foda);
  }

  async insertRelation(id: string, factor: FactorDTO) {
    const foda = await this.fodaModel.findById(id);
    const fodaObject = foda.toObject();
    const factores = fodaObject.factores;
    factores.push(factor);
    return this.fodaModel.findOneAndUpdate({ _id: id }, { factores });
  }

  async create(newFoda: FodaDTO) {
    const foda = new this.fodaModel(newFoda);
    const fodaCreadted = await foda.save();
    return fodaCreadted;
  }

  async update(id: string, updated: FodaDTO) {
    return this.fodaModel.findOneAndUpdate({ _id: id }, updated);
  }

  async delete(id: string) {
    return this.fodaModel.deleteOne({ _id: id });
  }

  private mapToValues(foda: any): FodaWithValues {
    foda.factores = foda?.factores?.map((factor) => {
      factor.importancia = mapImportanciaToValue(factor.importancia);
      factor.intensidad = mapIntensidadToValue(factor.intensidad);
      factor.tendencia = mapTendenciaToValue(factor.tendencia);
      factor.puntuacion =
        factor.importancia * factor.intensidad * factor.tendencia;
      return factor;
    });
    return foda;
  }
}
