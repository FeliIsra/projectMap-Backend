import { SituacionDelMercado } from "../ansoff/situacionDelMercado";
import { SituacionDelProducto } from "../ansoff/situacionDelProducto";
import { Fuerza } from "./fuerza";
import { Pregunta } from "./porter.schema";

export class PorterDto {
    _id: string;
    projectId: string;
    preguntas: Pregunta[];
}

export class PreguntaDto {
    _id: string;
    pregunta: string;
    fuerza: Fuerza;
    nivelDeConcordancia: SituacionDelMercado;
    valoracion: SituacionDelProducto;
}
