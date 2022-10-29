import * as mongoose from 'mongoose';
import { Area, Importancia, Intensidad, Tendencia, Urgencia } from './enums';
import { Completition } from '../completition';

export const FODASchema = new mongoose.Schema({
  projectId: { type: String, require: true },
  titulo: { type: String, require: true },
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
  completion: {
    type: String,
    require: false,
    default: function () {
      return Completition.Vacio;
    },
  },
});

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
