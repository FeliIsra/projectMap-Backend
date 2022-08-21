import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { NivelDeConcordancia } from './nivelDeConcordancia';
import { Valoracion } from './valoracion';
import { Fuerza } from './fuerza';

export type PorterDocument = Porter & Document;

@Schema()
export class Porter {
  @Prop({ required: true })
  projectId: string;

  @Prop([])
  preguntas: Pregunta[];
}

export const porterSchema = SchemaFactory.createForClass(Porter);

@Schema()
export class Pregunta {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  pregunta: string;

  @Prop({ type: String, enum: Fuerza, required: true })
  fuerza: string;

  @Prop({ type: String, enum: NivelDeConcordancia, required: true })
  nivelDeConcordancia: string;

  @Prop({ type: String, enum: Valoracion, required: true })
  valoracion: string;

  constructor(
    pregunta: string,
    fuerza: Fuerza,
    nivelDeConcordancia: NivelDeConcordancia,
    valoracion: Valoracion,
  ) {
    this.pregunta = pregunta;
    this.fuerza = fuerza.valueOf();
    this.nivelDeConcordancia = nivelDeConcordancia.valueOf();
    this.valoracion = valoracion.valueOf();
  }
}

const preguntaSchema = SchemaFactory.createForClass(Pregunta);
