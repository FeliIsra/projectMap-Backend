import { McKinsey, UnidadDeNegocio } from './mckinsey.schema';
import { Pregunta } from '../porter/porter.schema';
import { ApiProperty } from '@nestjs/swagger';

export class McKinseyDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  unidadesDeNegocio: UnidadDeNegocioDto[];
}

export class UnidadDeNegocioDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  fuerzaCompetitiva: number;

  @ApiProperty()
  atractivoDeMercado: number;

  @ApiProperty()
  cuadrante: number;
}
