import { Trend } from './trends';
import { Area } from './perspectives';

export class CheckpointDto {
  _id: string;
  month: string;
  target: number;
  actual: number;
}

export class ObjectiveDto {
  _id: string;
  action: string;
  measure: string;
  target: number;
  area: string;
  checkpoints: CheckpointDto[];
  progress: number;
  trend: Trend;
  responsible: string;
}

export class InitiativeDto {
  _id: string;
  area: Area;
  description: string;
}

export class BalancedScorecardDto {
  _id: string;
  projectId: string;
  titulo: string;
  createdAt: Date;
  objectives: ObjectiveDto[];
  initiatives: InitiativeDto[];
}
