import { Document } from 'mongoose';
import { Area, Importancia, Intensidad, Tendencia } from './enums';

export interface Pestel extends Document {
  projectId: string;
  factor: {
    id: string;
    area: Area;
    descripcion: string;
    importancia: Importancia;
    intensidad: Intensidad;
    tendencia: Tendencia;
  }[];
}

export interface PestelWithValues {
  projectId: string;
  factor: {
    id: string;
    area: number;
    importancia: number;
    intensidad: number;
    tendencia: number;
    puntuacion: number;
  }[];
}
