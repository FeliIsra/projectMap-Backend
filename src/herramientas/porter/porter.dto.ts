import { SituacionDelMercado } from '../ansoff/situacionDelMercado';
import { SituacionDelProducto } from '../ansoff/situacionDelProducto';
import { Fuerza } from './fuerza';
import { Pregunta } from './porter.schema';
import { ApiProperty } from '@nestjs/swagger';
import { NivelDeConcordancia } from './nivelDeConcordancia';
import { Valoracion } from './valoracion';

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
  preguntaId: number;

  @ApiProperty()
  fuerza: Fuerza;

  @ApiProperty()
  nivelDeConcordancia: NivelDeConcordancia;

  @ApiProperty()
  valoracion: Valoracion;
}

export class BulkEditQuestions {
  preguntas: Map<Fuerza, Map<number, BulkQuestionItem>>;
}

export class BulkQuestionItem {
  @ApiProperty()
  nivelDeConcordancia: NivelDeConcordancia;

  @ApiProperty()
  valoracion: Valoracion;
}
