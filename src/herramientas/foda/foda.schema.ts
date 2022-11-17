import * as mongoose from 'mongoose';
import { Area, Importancia, Intensidad, Tendencia, Urgencia } from './enums';
import { Completition } from '../completition';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  mapImportanciaToValue,
  mapIntensidadToValue,
  mapTendenciaToValue,
  mapUrgenciaToValue,
} from './utils/mapEnumsToValues';
import { HttpException, HttpStatus } from '@nestjs/common';

export type FodaDocument = Foda & Document;

@Schema()
export class Factor {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  descripcion: string;

  @Prop({ type: String, required: true })
  area: Area;

  @Prop({ type: String, required: true })
  importancia: Importancia;

  @Prop({ type: String })
  intensidad: Intensidad;

  @Prop({ type: String, required: true })
  tendencia: Tendencia;

  @Prop({ type: String })
  urgencia: Urgencia;

  @Prop({ type: Number, required: true, default: 0 })
  puntuacion: number;

  constructor(
    descripcion: string,
    area: Area,
    importancia: Importancia,
    intensidad: Intensidad,
    tendencia: Tendencia,
    urgencia: Urgencia,
  ) {
    this.descripcion = descripcion;
    this.area = area;
    this.importancia = importancia;
    this.intensidad = intensidad;
    this.tendencia = tendencia;
    this.urgencia = urgencia;
  }
}

export const factorSchema = SchemaFactory.createForClass(Factor);

factorSchema.pre('save', function (next) {
  try {
    const importancia = mapImportanciaToValue(this.importancia);
    const intensidad = mapIntensidadToValue(this.intensidad, this.area);
    const tendencia = mapTendenciaToValue(this.tendencia, this.area);
    const urgencia = mapUrgenciaToValue(this.urgencia);

    if (this.area == Area.OPORTUNIDAD)
      this.puntuacion = importancia * urgencia * tendencia;
    else if (this.area == Area.AMENAZA)
      this.puntuacion = importancia * urgencia * tendencia;
    else if (this.area == Area.DEBILIDAD)
      this.puntuacion = importancia * intensidad * tendencia;
    else if (this.area == Area.FORTALEZA)
      this.puntuacion = importancia * intensidad * tendencia;

    this.puntuacion = importancia * urgencia * tendencia;
  } catch (e) {
    throw new HttpException(
      `Factor: ${this._id.toString()} . ${this.area} parameters are not valid`,
      HttpStatus.BAD_REQUEST,
    );
  }

  next();
});

@Schema()
export class Foda {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  projectId: string;

  @Prop({ type: String })
  titulo: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop([factorSchema])
  factores: Factor[];

  @Prop({ type: String, default: Completition.Vacio })
  completion: Completition;
}

export const FODASchema = SchemaFactory.createForClass(Foda);

FODASchema.pre('save', function (next) {
  const amenaza = this.factores.find(
    (objective) => objective.area == Area.AMENAZA,
  );
  const debilidad = this.factores.find(
    (objective) => objective.area == Area.DEBILIDAD,
  );
  const oportunidad = this.factores.find(
    (objective) => objective.area == Area.OPORTUNIDAD,
  );
  const fortaleza = this.factores.find(
    (objective) => objective.area == Area.FORTALEZA,
  );

  if (fortaleza && oportunidad && debilidad && amenaza)
    this.completion = Completition.Completo;
  else if (this.factores.length == 0) this.completion = Completition.Vacio;
  else this.completion = Completition.Incompleto;

  next();
});

export const FODAPreSeedSchema = new mongoose.Schema({
  area: {
    type: String,
    require: true,
    enum: Area,
  },
  descripcion: {
    type: String,
    require: true,
  },
  consejo: {
    type: String,
    required: true,
  },
});
