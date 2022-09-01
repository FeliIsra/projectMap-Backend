export interface PestelDTO {
  titulo: string;
  createdAt: string;
  factores: {
    factor: string;
    area: string;
    descripcion: string;
    importancia: string;
    intensidad: string;
    tendencia: string;
  }[];
}

export interface FactorDTO {
  area: string;
  descripcion: string;
  importancia: string;
  intensidad: string;
  tendencia: string;
}
