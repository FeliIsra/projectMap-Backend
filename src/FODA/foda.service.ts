import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FodaDTO } from './foda.dto';
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

  async create(newFoda: FodaDTO) {
    const foda = new this.fodaModel(newFoda);
    const fodaCreadted = await foda.save();
    return fodaCreadted;
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
