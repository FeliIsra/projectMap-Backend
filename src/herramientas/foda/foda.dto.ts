export interface FodaDTO {
  titulo: string;
  createdAt: string;
  factores: {
    area: string;
    descripcion: string;
    importancia: string;
    intensidad: string;
    urgencia: string;
    tendencia: string;
  }[];
}

export interface FactorDTO {
  area: string;
  importancia: string;
  intensidad: string;
  tendendia: string;
  urgencia: string;
  descripcion: string;
}
