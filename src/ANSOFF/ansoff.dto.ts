import {SituacionDelMercado} from "./situacionDelMercado";
import {SituacionDelProducto} from "./situacionDelProducto";
import {Exito} from "./exito";
import {Estrategia} from "./estrategia";
import {Ansoff, Producto} from "./ansoff.schema";

export class AnsoffRequest {
    projectId: string;
    productos: ProductoRequest[];
}

export class ProductoRequest {
    nombre: string;
    situacionDelMercado: SituacionDelMercado;
    situacionDelProducto: SituacionDelProducto;
    exito: Exito;
}

export class AnsoffResponse {
    projectId: string;
    productos: ProductoResponse[];

    constructor(ansoff: Ansoff) {
        this.projectId = ansoff.projectId;
        this.productos = ansoff.productos.map(producto => new ProductoResponse(producto))
    }
}

export class ProductoResponse {
    id:string;
    nombre: string;
    situacionDelMercado: SituacionDelMercado;
    situacionDelProducto: SituacionDelProducto;
    exito: Exito;
    estrategia: Estrategia;

    constructor(producto: Producto) {
        this.id = producto._id.toString();
        this.nombre = producto.nombre;
        this.situacionDelMercado = producto.situacionDelMercado as SituacionDelMercado;
        this.situacionDelProducto = producto.situacionDelProducto as SituacionDelProducto;
        this.exito = producto.exito as Exito;
        this.estrategia = Estrategia.calculate(this.situacionDelMercado, this.situacionDelProducto);
    }

}