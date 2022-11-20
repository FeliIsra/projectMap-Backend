import { Area } from './enums';

export class Preesed {
  area: Area;
  descripcion: string;
  consejo: string;

  constructor(area: Area, descripcion: string, consejo: string) {
    this.area = area;
    this.descripcion = descripcion;
    this.consejo = consejo;
  }
}
