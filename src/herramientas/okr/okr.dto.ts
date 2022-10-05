export class OkrProjectDto {
  _id: string;
  projectId: string;
  titulo: string;
  createdAt: Date;
  okrs: OkrDto[];
}

export class OkrDto {
  _id: string;
  description: string;
  keyResults: KeyResultDto[];
  globalOkr: string;
  area: string;
  progress: number;
}

export class KeyResultDto {
  _id: string;
  description: string;
  goal: number;
  keyStatus: KeyStatusDto[];
  progress: number;
  startDate: string;
  dueDate: string;
  responsible: string;
}

export class KeyStatusDto {
  _id: string;
  month: string;
  value: number;

  constructor(month: string, value: number) {
    this.month = month;
    this.value = value;
  }
}

export class GlobalOkrDto {
  _id: string;
  description: string;
  keyStatus: KeyStatusDto[];
  progress: number;
  area: string;

  constructor(
    id: string,
    description,
    keyStatus: KeyStatusDto[],
    progress: number,
    area: string,
  ) {
    this._id = id;
    this.description = description;
    this.keyStatus = keyStatus;
    this.progress = progress;
    this.area = area;
  }
}
