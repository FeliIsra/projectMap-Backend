import { ApiProperty } from '@nestjs/swagger';

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
  area: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  importancia: string;

  @ApiProperty()
  intensidad: string;

  @ApiProperty()
  tendencia: string;
}
