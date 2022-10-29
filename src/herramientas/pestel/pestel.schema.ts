import * as mongoose from 'mongoose';
import { Area, Importancia, Intensidad, Tendencia } from './enums';
import { Prop } from '@nestjs/mongoose';
import { Completition } from '../completition';
import { Preguntas } from '../porter/preguntas';
import { porterSchema } from '../porter/porter.schema';

export const PESTELSchema = new mongoose.Schema({
  projectId: { type: String, require: true },
  titulo: { type: String },
  createdAt: { type: Date, default: Date.now() },
  factores: [
    {
      area: {
        type: String,
        require: true,
        enum: Area,
      },
      descripcion: {
        type: String,
        require: true,
      },
      importancia: {
        type: String,
        require: true,
        enum: Importancia,
      },
      intensidad: {
        type: String,
        require: true,
        enum: Intensidad,
      },
      tendencia: {
        type: String,
        require: true,
        enum: Tendencia,
      },
      puntuacion: {
        type: Number,
        require: true,
        default: function () {
          return 0;
        },
      },
    },
  ],
  completion: {
    type: String,
    require: false,
    default: function () {
      return Completition.Vacio;
    },
  },
});

PESTELSchema.pre('save', function (next) {
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
