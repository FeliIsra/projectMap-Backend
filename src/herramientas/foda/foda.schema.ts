import * as mongoose from 'mongoose';
import { Area, Importancia, Intensidad, Tendencia, Urgencia } from './enums';
import { Completition } from '../completition';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Factor {
  @Prop({ type: String, required: true })
  descripcion: Area;

  @Prop({ type: String, required: true })
  area: Area;

  @Prop({ type: String, required: true })
  importancia: Importancia;

  @Prop({ type: String, required: true })
  intensidad: Intensidad;

  @Prop({ type: String, required: true })
  tendencia: Tendencia;

  @Prop({ type: String, required: true })
  urgencia: Urgencia;

  @Prop({ type: Number, required: true, default: 0 })
  puntuacion: number;
}

export const factorSchema = SchemaFactory.createForClass(Factor);

@Schema()
export class Foda {
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
