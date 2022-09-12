import { SituacionDelMercado } from '../ansoff/situacionDelMercado';
import { SituacionDelProducto } from '../ansoff/situacionDelProducto';
import { Fuerza } from './fuerza';
import { Pregunta } from './porter.schema';
import { ApiProperty } from '@nestjs/swagger';

export class PorterDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  preguntas: Pregunta[];
}

export class PreguntaDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  preguntaId: string;

  @ApiProperty()
  fuerza: Fuerza;

  @ApiProperty()
  nivelDeConcordancia: SituacionDelMercado;

  @ApiProperty()
  valoracion: SituacionDelProducto;
}
