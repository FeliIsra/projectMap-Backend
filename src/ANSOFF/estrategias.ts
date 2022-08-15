import {SituacionDelMercado} from "./situacionDelMercado";
import {SituacionDelProducto} from "./situacionDelProducto";

export enum Estrategias {
    PENETRACION = "Penetracion",
    DIVERSIFICAICON = "Diversificacion",
    DESARROLLO_DE_PRODUCTO = "Desarrollo de Producto",
    DESARROLLO_DE_MERCADO = "Desarrollo de Mercado"
}

export namespace Estrategias {
    export function calculate(situacionDelMercado: SituacionDelMercado, situacionDelProducto: SituacionDelProducto) {
        switch (situacionDelMercado) {
            case SituacionDelMercado.ACTUAL:
                if (situacionDelProducto == SituacionDelProducto.ACTUAL) return Estrategias.PENETRACION;
                else return Estrategias.DESARROLLO_DE_PRODUCTO
            case SituacionDelMercado.NUEVO:
                if (situacionDelProducto == SituacionDelProducto.ACTUAL) return Estrategias.DESARROLLO_DE_MERCADO;
                else return Estrategias.DIVERSIFICAICON
        }
    }
}