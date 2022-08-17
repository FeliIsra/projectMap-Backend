import {SituacionDelMercado} from "./situacionDelMercado";
import {SituacionDelProducto} from "./situacionDelProducto";
import {Exito} from "./exito";
import {Estrategia} from "./estrategia";
import {Ansoff, Producto} from "./ansoff.schema";

export class AnsoffRequestDto {
    projectId: string;
    productos: ProductoRequestDto[];
}

export class ProductoRequestDto {
    nombre: string;
    situacionDelMercado: SituacionDelMercado;
    situacionDelProducto: SituacionDelProducto;
    exito: Exito;
}

export class AnsoffResponseDto {
    projectId: string;
    productos: ProductoResponseDto[];

    constructor(ansoff: Ansoff) {
        this.projectId = ansoff.projectId;
        this.productos = ansoff.productos.map(producto => new ProductoResponseDto(producto))
    }
}

//TODO como garompa le pongo aca un id
export class ProductoResponseDto {
    nombre: string;
    situacionDelMercado: SituacionDelMercado;
    situacionDelProducto: SituacionDelProducto;
    exito: Exito;
    estrategia: Estrategia;

    constructor(producto: Producto) {
        this.nombre = producto.nombre;
        this.situacionDelMercado = producto.situacionDelMercado as SituacionDelMercado;
        this.situacionDelProducto = producto.situacionDelProducto as SituacionDelProducto;
        this.exito = producto.exito as Exito;
        this.estrategia = Estrategia.calculate(this.situacionDelMercado, this.situacionDelProducto);
    }

}