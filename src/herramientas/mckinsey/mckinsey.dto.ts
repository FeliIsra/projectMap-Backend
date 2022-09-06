import { McKinsey, UnidadDeNegocio } from './mckinsey.schema';
import { Pregunta } from '../porter/porter.schema';

export class McKinseyDto {
  _id: string;
  projectId: string;
  titulo: string;
  createdAt: string;
  unidadesDeNegocio: UnidadDeNegocioDto[];
}

export class UnidadDeNegocioDto {
  _id: string;
  nombre: string;
  fuerzaCompetitiva: number;
  atractivoDeMercado: number;
  cuadrante: number;
}
