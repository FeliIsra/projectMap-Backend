import { Document } from 'mongoose';

export interface Project extends Document {
  owner: string;
  titulo: string;
  descripcion: string;
  puedenVer: string[];
}
