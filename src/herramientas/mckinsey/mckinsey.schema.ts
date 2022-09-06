import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Porter, Pregunta } from '../porter/porter.schema';
import { Cuadrantes } from './cuadrantes';

export type MckinseyDocument = McKinsey & Document;

@Schema()
export class UnidadDeNegocio {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  nombre: number;

  @Prop({ type: Number, required: true })
  fuerzaCompetitiva: number;

  @Prop({ type: Number, required: true })
  atractivoDeMercado: number;

  @Prop({ type: String })
  cuadrante: string;
}

const unidadDeNegocioSchema = SchemaFactory.createForClass(UnidadDeNegocio);
unidadDeNegocioSchema.pre('save', function (next) {
  this.cuadrante = Cuadrantes.clasificarUnidadDeNegocio(
    this.fuerzaCompetitiva,
    this.atractivoDeMercado,
  );
  next();
});

@Schema()
export class McKinsey {
  @Prop({ required: true })
  projectId: string;

  @Prop({ type: String })
  titulo: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop([unidadDeNegocioSchema])
  unidadesDeNegocio: UnidadDeNegocio[];
}

export const mcKinseySchema = SchemaFactory.createForClass(McKinsey);
