import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { NivelDeConcordancia } from './nivelDeConcordancia';
import { Valoracion } from './valoracion';
import { Fuerza } from './fuerza';

export type PorterDocument = Porter & Document;

@Schema()
export class Pregunta {
  @Prop({ type: Number, required: true })
  preguntaId: number;

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

@Schema()
export class Porter {
  @Prop({ required: true })
  projectId: string;

  @Prop([preguntaSchema])
  preguntas: Pregunta[];
}

export const porterSchema = SchemaFactory.createForClass(Porter);
