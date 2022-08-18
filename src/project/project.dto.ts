export interface ProjectDTO {
  owner: string;
  titulo: string;
  descripcion: string;
  puedenVer: string[];
  color: string;
}

export interface PuedeVerDTO {
  puedeVer: string[];
}
