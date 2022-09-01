import * as mongoose from 'mongoose';
import { Area, Importancia, Intensidad, Tendencia } from './enums';

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
});
