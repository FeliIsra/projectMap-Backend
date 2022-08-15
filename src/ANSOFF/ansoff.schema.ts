import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {SituacionDelProducto} from "./situacionDelProducto";
import {SituacionDelMercado} from "./situacionDelMercado";
import {Estrategias} from "./estrategias";
import {Exito} from "./exito";

export type AnsoffDocument = Ansoff & Document;

@Schema()
export class Producto {

    @Prop({type: String, enum: SituacionDelMercado})
    situacionDeMercado: string;

    @Prop({type: String, enum: SituacionDelProducto, required: true})
    situacionDelProducto: string;

    @Prop({type: String, enum: Exito})
    exito: string;

    estrategia() {
        return Estrategias.calculate(this.situacionDeMercado as SituacionDelMercado, this.situacionDelProducto as SituacionDelProducto)
    }
}

const productSchema = SchemaFactory.createForClass(Producto);

@Schema()
export class Ansoff {
    @Prop({required: true, unique: true})
    projectId: string;

    //  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }] })

    @Prop([productSchema])
    productos: Producto[];

}

export const AnsoffSchema = SchemaFactory.createForClass(Ansoff);

/*
export const AnsoffSchema = new mongoose.Schema({
    projectId: {type: String, require: true, unique: true},
    productos: [
        {
            situacionDeMercado: {
                type: String,
                require: true,
                enum: SituacionDelMercado,
            },
            situacionDeProducto: {
                type: String,
                require: true,
                enum: SituacionDelProducto,
            },
            exito: {
                type: String,
                require: false,
                enum: Exito
            }
        }
    ]
})
*/