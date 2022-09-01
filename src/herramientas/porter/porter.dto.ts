import { SituacionDelMercado } from '../ansoff/situacionDelMercado';
import { SituacionDelProducto } from '../ansoff/situacionDelProducto';
import { Fuerza } from './fuerza';
import { Pregunta } from './porter.schema';

export class PorterDto {
  _id: string;
  projectId: string;
  titulo: string;
  createdAt: string;
  preguntas: Pregunta[];
}

export class PreguntaDto {
  _id: string;
  preguntaId: string;
  fuerza: Fuerza;
  nivelDeConcordancia: SituacionDelMercado;
  valoracion: SituacionDelProducto;
}
