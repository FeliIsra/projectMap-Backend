import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {SituacionDelProducto} from "./situacionDelProducto";
import {SituacionDelMercado} from "./situacionDelMercado";
import {Exito} from "./exito";

export type AnsoffDocument = Ansoff & Document;

@Schema()
export class Producto {
    @Prop({type: String, required: true})
    nombre: string;

    @Prop({type: String, enum: SituacionDelMercado})
    situacionDelMercado: string;

    @Prop({type: String, enum: SituacionDelProducto, required: true})
    situacionDelProducto: string;

    @Prop({type: String, enum: Exito})
    exito: string;

    constructor(nombre: string, situacionDelMercado: SituacionDelMercado, situacionDelProducto: SituacionDelProducto, exito: string) {
        this.nombre = nombre;
        this.situacionDelMercado = situacionDelMercado.valueOf();
        this.situacionDelProducto = situacionDelProducto.valueOf();
        this.exito = exito.valueOf();
    }
}

const productSchema = SchemaFactory.createForClass(Producto);

@Schema()
export class Ansoff {
    @Prop({required: true, unique: true})
    projectId: string;

    @Prop([productSchema])
    productos: Producto[];

}

export const AnsoffSchema = SchemaFactory.createForClass(Ansoff);