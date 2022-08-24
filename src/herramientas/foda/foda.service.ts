import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Area, Importancia, Intensidad, Tendencia, Urgencia } from './enums';
import { FactorDTO, FodaDTO } from './foda.dto';
import { Foda, FodaWithValues } from './foda.type';
import {
  mapImportanciaToValue,
  mapIntensidadToValue,
  mapTendenciaToValue,
  mapUrgenciaToValue,
} from './utils/mapEnumsToValues';

@Injectable()
export class FodaService {
  constructor(@InjectModel('FODA') private fodaModel: Model<Foda>) {}

  async getAll() {
    const fodas = await this.fodaModel.find({});
    return fodas.map((foda) => {
      const fodaObject = foda.toObject();
      return this.mapToValues(fodaObject);
    });
  }

  async getOptions() {
    return {
      importancia: [
        Importancia['Totalmente importante'],
        Importancia['Muy importante'],
        Importancia.Importante,
        Importancia.Inmaterial,
        Importancia['Sin importancia'],
      ],
      intensidad: [
        Intensidad['Muy fuerte'],
        Intensidad.Fuerte,
        Intensidad.Promedio,
        Intensidad.Debil,
        Intensidad['Muy debil'],
      ],
      tendencia: [
        Tendencia['Mucha mejora'],
        Tendencia.Mejora,
        Tendencia.Mantiene,
        Tendencia.Empeoramiento,
        Tendencia.Peor,
      ],
      urgencia: [
        Urgencia['Algo urgente'],
        Urgencia['Muy urgente'],
        Urgencia['Nada urgente'],
        Urgencia['Para ayer'],
        Urgencia.Urgente,
      ],
    };
  }

  async getAllByProjectId(projectId) {
    const fodas = await this.fodaModel.find({ projectId });
    return fodas.map((foda) => {
      const fodaObject = foda.toObject();
      return this.mapToValues(fodaObject);
    });
  }

  async getOne(id: string) {
    const foda = await this.fodaModel.findById(id);
    return this.mapToValues(foda);
  }

  async insertFactor(id: string, factor: FactorDTO) {
    let foda = await this.fodaModel.findById(id);
    const fodaObject = foda.toObject();
    const factores = fodaObject.factores;
    factores.push(factor);
    await this.fodaModel.findOneAndUpdate({ _id: id }, { factores });
    foda = await this.fodaModel.findById(id);
    return this.mapToValues(foda);
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

  async deleteFactor(id: string, idFactor: string) {
    const foda = await this.fodaModel.findById(id);
    const fodaObject = foda.toObject();
    const factores = fodaObject.factores.filter(
      (factor) => factor._id != idFactor,
    );
    return this.fodaModel.findOneAndUpdate({ _id: id }, { factores });
  }

  async updateFactor(id: string, idFactor: string, updatedFactor: FactorDTO) {
    const foda = await this.fodaModel.findById(id).then((foda) => {
      const factor = foda.factores.find(
        (factor) => factor._id.toString() == idFactor,
      );
      if (updatedFactor.area) factor.area = updatedFactor.area as Area;
      if (updatedFactor.importancia)
        factor.importancia = updatedFactor.importancia as Importancia;
      if (updatedFactor.intensidad)
        factor.intensidad = updatedFactor.intensidad as Intensidad;
      if (updatedFactor.tendendia)
        factor.tendencia = updatedFactor.tendendia as Tendencia;
      if (updatedFactor.urgencia)
        factor.urgencia = updatedFactor.urgencia as Urgencia;
      if (updatedFactor.descripcion)
        factor.descripcion = updatedFactor.descripcion;
      return foda.save();
    });
    return foda;
  }

  private mapToValues(foda: any): FodaWithValues {
    foda.factores = foda?.factores?.map((factor) => {
      factor.puntuacion = this.getPuntuacion(factor);
      return factor;
    });
    return foda;
  }

  private getPuntuacion(factor: any): number {
    const calcularFortalezas = (_factor) => {
      const factor = _factor;
      const importancia = mapImportanciaToValue(factor.importancia);
      const intensidad = mapIntensidadToValue(factor.intensidad, factor.area);
      const tendencia = mapTendenciaToValue(factor.tendencia, factor.area);

      return importancia * intensidad * tendencia;
    };

    const calcularOportunidades = (_factor) => {
      const factor = _factor;
      const importancia = mapImportanciaToValue(factor.importancia);
      const urgencia = mapUrgenciaToValue(factor.urgencia);
      const tendencia = mapTendenciaToValue(factor.tendencia, factor.area);

      return importancia * urgencia * tendencia;
    };

    const calcularAmenazas = (_factor) => {
      const factor = _factor;
      const importancia = mapImportanciaToValue(factor.importancia);
      const urgencia = mapUrgenciaToValue(factor.urgencia);
      const tendencia = mapTendenciaToValue(factor.tendencia, factor.area);

      return importancia * urgencia * tendencia;
    };

    const calcularDebilidades = (_factor) => {
      const factor = _factor;
      const importancia = mapImportanciaToValue(factor.importancia);
      const intensidad = mapIntensidadToValue(factor.intensidad, factor.area);
      const tendencia = mapTendenciaToValue(factor.tendencia, factor.area);

      return importancia * intensidad * tendencia;
    };

    const dict = {
      [Area.OPORTUNIDAD]: calcularOportunidades,
      [Area.AMENAZA]: calcularAmenazas,
      [Area.DEBILIDAD]: calcularDebilidades,
      [Area.FORTALEZA]: calcularFortalezas,
    };
    return dict[factor.area](factor);
  }
}
