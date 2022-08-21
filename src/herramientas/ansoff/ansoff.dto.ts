import { SituacionDelMercado } from './situacionDelMercado';
import { SituacionDelProducto } from './situacionDelProducto';
import { Exito } from './exito';
import { Estrategia } from './estrategia';

export class AnsoffDto {
  projectId: string;
  productos: AnsoffProductDto[];
}

export class AnsoffProductDto {
  _id: string;
  nombre: string;
  situacionDelMercado: SituacionDelMercado;
  situacionDelProducto: SituacionDelProducto;
  exito: Exito;
  estrategia: Estrategia;
}
