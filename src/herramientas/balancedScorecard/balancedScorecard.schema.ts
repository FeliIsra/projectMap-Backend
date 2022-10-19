import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Trend } from './trends';
import { Area } from './perspectives';
import { Deviation } from './deviations';

export type BalancedScoreCardDocument = BalancedScorecard & Document;

@Schema()
export class Checkpoint {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  month: string;

  @Prop({ type: Number, required: true })
  target: number;

  @Prop({ type: Number, required: false })
  actual: number;

  constructor(month: string, target: number, actual: number) {
    this.month = month;
    this.target = target;
    this.actual = actual;
  }
}

export const checkPointSchema = SchemaFactory.createForClass(Checkpoint);

@Schema()
export class Objective {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  measure: string;

  @Prop({ type: String })
  target: number;

  @Prop({ type: String })
  area: Area;

  @Prop({ type: [checkPointSchema] })
  checkpoints: Checkpoint[];

  @Prop({ type: Number })
  progress: number;

  @Prop({ type: String })
  trend: Trend;

  @Prop({ type: String })
  deviation: Deviation;

  @Prop({ type: String, required: false })
  responsible: string;

  constructor(
    action: string,
    measure: string,
    target: number,
    area: Area,
    responsible: string,
  ) {
    this.action = action;
    this.measure = measure;
    this.target = target;
    this.area = area;
    this.responsible = responsible;
  }
}

export const objectiveSchema = SchemaFactory.createForClass(Objective);
objectiveSchema.pre('save', function (next) {
  if (this.checkpoints) {
    const completedCheckpoints = this.checkpoints.filter(
      (checkpoint) => checkpoint.actual && checkpoint.actual != 0,
    );
    const historicProgress = completedCheckpoints
      .slice(0, completedCheckpoints.length - 1)
      .map((k) => (k.actual / k.target) * 100);
    const avgHistoricProgress =
      historicProgress.reduce((a, b) => a + b, 0) / historicProgress.length;

    const lastCheckpoint = completedCheckpoints.at(
      completedCheckpoints.length - 1,
    );
    const lastProgress = (lastCheckpoint.actual / lastCheckpoint.target) * 100;

    if (lastProgress > avgHistoricProgress) this.trend = Trend.Upwards;
    else if (lastProgress < avgHistoricProgress) this.trend = Trend.Downwards;
    else this.trend = Trend.Stable;

    const actual = this.checkpoints
      .map((k) => k.actual)
      .reduce((a, b) => a + b, 0);
    this.progress = (actual / this.target) * 100;

    const progressFromCompletedCheckpoints =
      completedCheckpoints
        .map((k) => (k.actual / k.target) * 100)
        .reduce((a, b) => a + b, 0) / completedCheckpoints.length;

    if (progressFromCompletedCheckpoints > 95) this.deviation = Deviation.None;
    else if (progressFromCompletedCheckpoints <= 70)
      this.deviation = Deviation.Acceptable;
    else this.deviation = Deviation.Risky;
  }

  next();
});

@Schema()
export class Initiative {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String })
  area: Area;

  @Prop({ type: String })
  description: string;

  constructor(area: Area, description: string) {
    this.area = area;
    this.description = description;
  }
}

export const initiativesSchema = SchemaFactory.createForClass(Initiative);

@Schema()
export class BalancedScorecard {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  projectId: string;

  @Prop({ type: String })
  titulo: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop([objectiveSchema])
  objectives: Objective[];

  @Prop([initiativesSchema])
  initiatives: Initiative[];
}

export const BalanceScorecardSchema =
  SchemaFactory.createForClass(BalancedScorecard);
