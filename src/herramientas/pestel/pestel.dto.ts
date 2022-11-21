import { ApiProperty } from '@nestjs/swagger';
import { Area, Importancia, Intensidad, Tendencia } from './enums';

export class PestelDto {
  @ApiProperty()
  titulo: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  factores: {
    factor: string;
    area: string;
    descripcion: string;
    importancia: string;
    intensidad: string;
    tendencia: string;
  }[];
}

export class FactorDto {
  @ApiProperty()
  area: Area;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  importancia: Importancia;

  @ApiProperty()
  intensidad: Intensidad;

  @ApiProperty()
  tendencia: Tendencia;
}
