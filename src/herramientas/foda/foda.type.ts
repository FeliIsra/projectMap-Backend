import { Document } from 'mongoose';
import { Area, Importancia, Intensidad, Tendencia } from './enums';

export interface Foda extends Document {
  projectId: string;
  factores: {
    _id: string;
    area: Area;
    descripcion: string;
    importancia: Importancia;
    intensidad: Intensidad;
    tendencia: Tendencia;
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
    puntuacion: number;
  }[];
}
