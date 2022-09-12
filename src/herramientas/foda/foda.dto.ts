import { ApiProperty } from '@nestjs/swagger';

export class FodaDto {
  @ApiProperty()
  titulo: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  factores: {
    area: string;
    descripcion: string;
    importancia: string;
    intensidad: string;
    urgencia: string;
    tendencia: string;
  }[];
}

export class FactorDto {
  @ApiProperty()
  area: string;

  @ApiProperty()
  importancia: string;

  @ApiProperty()
  intensidad: string;

  @ApiProperty()
  tendencia: string;

  @ApiProperty()
  urgencia: string;

  @ApiProperty()
  descripcion: string;
}
