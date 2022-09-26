import { Document } from 'mongoose';
import { Area, Importancia, Intensidad, Tendencia, Urgencia } from './enums';

export interface Foda extends Document {
  projectId: string;
  factores: {
    _id: string;
    area: Area;
    descripcion: string;
    importancia: Importancia;
    intensidad: Intensidad;
    tendencia: Tendencia;
    urgencia: Urgencia;
  }[];
}

export interface FodaWithValues {
  projectId: string;
  factores: {
    _id: string;
    area: number;
    importancia: number;
    intensidad: number;
    tendencia: number;
    urgencia: number;
    puntuacion: number;
  }[];
}

export interface FodaPreSeed extends Document {
  area: Area;
  descripcion: string;
  consejo: string;
}
