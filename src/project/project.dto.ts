export interface ProjectDTO {
  owner: string;
  titulo: string;
  descripcion: string;
  puedenVer: string[];
}

export interface PuedeVerDTO {
  puedeVer: string[];
}
