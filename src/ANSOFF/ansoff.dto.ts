import {SituacionDelMercado} from "./situacionDelMercado";
import {SituacionDelProducto} from "./situacionDelProducto";
import {Exito} from "./exito";

export class AnsoffDto {
    projectId: string;
    productos: ProductoDto[];
}

export class ProductoDto {
    situacionDelMercado: SituacionDelMercado;
    situacionDelProducto: SituacionDelProducto;
    exito: Exito;
}