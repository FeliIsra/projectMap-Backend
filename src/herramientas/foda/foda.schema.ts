import * as mongoose from 'mongoose';
import { Area, Importancia, Intensidad, Tendencia, Urgencia } from './enums';

export const FODASchema = new mongoose.Schema({
  projectId: { type: String, require: true },
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
      urgencia: {
        type: String,
        require: true,
        enum: Urgencia,
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
});
