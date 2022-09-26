import { Document } from 'mongoose';
import { Area, Importancia, Intensidad, Tendencia } from './enums';

export interface Pestel extends Document {
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

export interface PestelWithValues {
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

export interface PestelPreSeed extends Document {
  area: Area;
  descripcion: string;
  consejoPositivo: string;
  consejoNegativo: string;
  puntaje: number;
}
