import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { SituacionDelProducto } from './situacionDelProducto';
import { SituacionDelMercado } from './situacionDelMercado';
import { Exito } from './exito';
import { Estrategia } from './estrategia';
import { Completition } from '../completition';

export type AnsoffDocument = Ansoff & Document;

@Schema()
export class Producto {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: String, enum: SituacionDelMercado })
  situacionDelMercado: string;

  @Prop({ type: String, enum: SituacionDelProducto, required: true })
  situacionDelProducto: string;

  @Prop({ type: String, enum: Exito })
  exito: string;

  @Prop({ type: String, enum: Estrategia })
  estrategia: string;

  constructor(
    nombre: string,
    situacionDelMercado: SituacionDelMercado,
    situacionDelProducto: SituacionDelProducto,
    exito?: string,
  ) {
    this.nombre = nombre;
    this.situacionDelMercado = situacionDelMercado.valueOf();
    this.situacionDelProducto = situacionDelProducto.valueOf();
    this.exito = exito?.valueOf();
    this.estrategia = Estrategia.calculate(
      this.situacionDelMercado as SituacionDelMercado,
      this.situacionDelProducto as SituacionDelProducto,
    );
  }
}

const productSchema = SchemaFactory.createForClass(Producto);

@Schema()
export class Ansoff {
  @Prop({ required: true })
  projectId: string;

  @Prop({ type: String })
  titulo: string;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop([productSchema])
  productos: Producto[];

  @Prop({ type: String, default: Completition.Vacio })
  completion: Completition;
}

export const AnsoffSchema = SchemaFactory.createForClass(Ansoff);
AnsoffSchema.pre('save', function (next) {
  if (this.productos.length >= 2) this.completion = Completition.Completo;
  else if (this.productos.length == 1)
    this.completion = Completition.Incompleto;
  else this.completion = Completition.Vacio;

  next();
});
