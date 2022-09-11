export interface ProjectDTO {
  owner: string;
  titulo: string;
  descripcion: string;
  sharedUsers: string[];
  color: string;
}

export interface ShareProjectDto {
  users: string[];
}
