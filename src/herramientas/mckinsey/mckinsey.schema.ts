import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Porter, Pregunta } from '../porter/porter.schema';
import { Cuadrantes } from './cuadrantes';
import { Completition } from '../completition';
import { AnsoffSchema } from '../ansoff/ansoff.schema';

export type MckinseyDocument = McKinsey & Document;

@Schema()
export class UnidadDeNegocio {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  nombre: string;

  @Prop({ type: Number, required: true })
  fuerzaCompetitiva: number;

  @Prop({ type: Number, required: true })
  atractivoDeMercado: number;

  @Prop({ type: String })
  cuadrante: string;

  constructor(
    nombre: string,
    fuerzaCompetitiva: number,
    atractivoDeMercado: number,
  ) {
    this.nombre = nombre;
    this.fuerzaCompetitiva = fuerzaCompetitiva;
    this.atractivoDeMercado = atractivoDeMercado;
  }
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

  @Prop({ type: String, default: Completition.Vacio })
  completion: Completition;
}

export const mcKinseySchema = SchemaFactory.createForClass(McKinsey);
mcKinseySchema.pre('save', function (next) {
  if (this.unidadesDeNegocio.length >= 3)
    this.completion = Completition.Completo;
  else if (this.unidadesDeNegocio.length == 0)
    this.completion = Completition.Vacio;
  else this.completion = Completition.Incompleto;

  next();
});
