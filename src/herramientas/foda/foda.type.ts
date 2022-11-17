import { Document } from 'mongoose';
import { Area, Importancia, Intensidad, Tendencia, Urgencia } from './enums';

export interface FodaPreSeed extends Document {
  area: Area;
  descripcion: string;
  consejo: string;
}
