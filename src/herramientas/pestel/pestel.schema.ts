import * as mongoose from 'mongoose';
import { Area, Importancia, Intensidad, Tendencia } from './enums';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Completition } from '../completition';
import {
  mapImportanciaToValue,
  mapIntensidadToValue,
  mapTendenciaToValue,
} from './utils/mapEnumsToValues';

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

  @Prop({ type: Number, required: true, default: 0 })
  puntuacion: number;

  constructor(
    descripcion: string,
    area: Area,
    importancia: Importancia,
    intensidad: Intensidad,
    tendencia: Tendencia,
  ) {
    this.descripcion = descripcion;
    this.area = area;
    this.importancia = importancia;
    this.intensidad = intensidad;
    this.tendencia = tendencia;
  }
}

export const factorSchema = SchemaFactory.createForClass(Factor);

factorSchema.pre('save', function (next) {
  const importancia = mapImportanciaToValue(this.importancia, this.area);
  const intensidad = mapIntensidadToValue(this.intensidad, this.area);
  const tendencia = mapTendenciaToValue(this.tendencia, this.area);

  this.puntuacion = importancia * intensidad * tendencia;

  next();
});

@Schema()
export class Pestel {
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

export const PestelSchema = SchemaFactory.createForClass(Pestel);

PestelSchema.pre('save', function (next) {
  if (this.factores.length >= 4) this.completion = Completition.Completo;
  else if (this.factores.length == 0) this.completion = Completition.Vacio;
  else this.completion = Completition.Incompleto;

  next();
});

export const PESTELPreSeedSchema = new mongoose.Schema({
  area: {
    type: String,
    require: true,
    enum: Area,
  },
  descripcion: {
    type: String,
    require: true,
  },
  puntaje: {
    type: Number,
    require: true,
  },
  consejoPositivo: {
    type: String,
    required: true,
  },
  consejoNegativo: {
    type: String,
    required: true,
  },
});
