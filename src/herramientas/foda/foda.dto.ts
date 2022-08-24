export interface FodaDTO {
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
