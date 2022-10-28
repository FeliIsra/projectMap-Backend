import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { NivelDeConcordancia } from './nivelDeConcordancia';
import { Valoracion } from './valoracion';
import { Fuerza } from './fuerza';
import { okrSchema } from '../okr/okr.schema';
import { Preguntas } from './preguntas';

export type PorterDocument = Porter & Document;

@Schema()
export class Pregunta {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: Number, required: true })
  preguntaId: number;

  @Prop({ type: String, enum: Fuerza, required: true })
  fuerza: string;

  @Prop({ type: String, enum: NivelDeConcordancia, required: true })
  nivelDeConcordancia: string;

  @Prop({ type: String, enum: Valoracion, required: true })
  valoracion: string;

  constructor(
    preguntaId: number,
    fuerza: Fuerza,
    nivelDeConcordancia: NivelDeConcordancia,
    valoracion: Valoracion,
  ) {
    this.preguntaId = preguntaId;
    this.fuerza = fuerza.valueOf();
    this.nivelDeConcordancia = nivelDeConcordancia.valueOf();
    this.valoracion = valoracion.valueOf();
  }
}

const preguntaSchema = SchemaFactory.createForClass(Pregunta);

@Schema()
export class Porter {
  @Prop({ required: true })
  projectId: string;

  @Prop({ type: String })
  titulo: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop([preguntaSchema])
  preguntas: Pregunta[];

  @Prop({ type: Object })
  preguntasFormatted: any;

  @Prop({ type: Boolean, default: false })
  completed: boolean;
}

export const porterSchema = SchemaFactory.createForClass(Porter);
porterSchema.pre('save', function (next) {
  const numberOfQuestionsToAnswer =
    Preguntas.rivalidadEntreCompetidores.length +
    Preguntas.amenazaDeNuevosCompetidores.length +
    Preguntas.amenazaDeSustitucion.length +
    Preguntas.poderDeNegociacionConProveedores.length +
    Preguntas.poderDeNegociacionConProveedores.length;

  this.completed = this.preguntas.length == numberOfQuestionsToAnswer;

  next();
});
