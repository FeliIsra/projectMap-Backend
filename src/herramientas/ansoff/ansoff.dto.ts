import { SituacionDelMercado } from './situacionDelMercado';
import { SituacionDelProducto } from './situacionDelProducto';
import { Exito } from './exito';
import { Estrategia } from './estrategia';
import { ApiProperty } from '@nestjs/swagger';

export class AnsoffDto {
  @ApiProperty()
  projectId: string;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  productos: AnsoffProductDto[];
}

export class AnsoffProductDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  situacionDelMercado: SituacionDelMercado;

  @ApiProperty()
  situacionDelProducto: SituacionDelProducto;

  @ApiProperty()
  exito: Exito;

  @ApiProperty()
  estrategia: Estrategia;
}
