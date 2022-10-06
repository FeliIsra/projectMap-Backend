import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Trend } from './trends';
import { Area } from './perspectives';

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

  constructor(action: string, measure: string, target: number, area: Area) {
    this.action = action;
    this.measure = measure;
    this.target = target;
    this.area = area;
  }
}

export const objectiveSchema = SchemaFactory.createForClass(Objective);
objectiveSchema.pre('save', function (next) {
  if (this.checkpoints) {
    const actual = this.checkpoints
      .map((k) => k.actual)
      .reduce((a, b) => a + b);
    const newProgress = (actual / this.target) * 100;
    if (this.progress) {
      if (this.progress > newProgress) this.trend = Trend.Downwards;
      else if (this.progress < newProgress) this.trend = Trend.Upwards;
      else this.trend = Trend.Stable;
    } // TODO fix

    this.progress = newProgress;
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
  title: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop([objectiveSchema])
  objectives: Objective[];

  @Prop([initiativesSchema])
  initiatives: Initiative[];
}

export const BalanceScorecardSchema =
  SchemaFactory.createForClass(BalancedScorecard);
