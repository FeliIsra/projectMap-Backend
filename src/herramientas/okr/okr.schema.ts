import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type OkrDocument = OkrProject & Document;

@Schema()
export class KeyStatus {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  month: string;

  @Prop({ type: Number, required: false, default: 0 })
  value: number;

  constructor(month: string, value: number) {
    this.month = month;
    this.value = value;
  }
}
export const keyStatusSchema = SchemaFactory.createForClass(KeyStatus);

@Schema()
export class KeyResult {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  goal: number;

  @Prop({ type: Number })
  priority: number;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  dueDate: Date;

  @Prop([keyStatusSchema])
  keyStatus: KeyStatus[];

  @Prop({ type: Number })
  progress: number;

  @Prop({ type: String, required: false })
  responsible: string;

  constructor(description: string, goal: number, responsible: string) {
    this.description = description;
    this.goal = goal;
    this.responsible = responsible;
  }
}
export const keyResultSchema = SchemaFactory.createForClass(KeyResult);
keyResultSchema.pre('save', function (next) {
  this.progress =
    (this.keyStatus.map((k) => k.value).reduce((a, b) => a + b) * 100) /
    this.goal;
  next();
});

// TODO entre 3 y 5
@Schema()
export class Okr {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String })
  description: string;

  @Prop([keyResultSchema])
  keyResults: KeyResult[];

  @Prop({ type: String, required: false })
  globalOkr: string;

  @Prop({ type: String, required: false })
  area: string;

  @Prop({ type: Number })
  progress: number;

  @Prop({ type: Number, required: true })
  quarter: number;

  constructor(
    description: string,
    globalOkr: string,
    area: string,
    quarter: number,
  ) {
    this.description = description;
    this.globalOkr = globalOkr;
    this.area = area;
    this.quarter = quarter;
  }
}
export const okrSchema = SchemaFactory.createForClass(Okr);
okrSchema.pre('save', function (next) {
  if (this.keyResults.length)
    this.progress =
      this.keyResults.map((k) => k.progress).reduce((a, b) => a + b) /
      this.keyResults.length;

  next();
});

@Schema()
export class OkrProject {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  projectId: string;

  @Prop({ type: String })
  titulo: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop([okrSchema])
  okrs: Okr[];
}

export const okrProjectSchema = SchemaFactory.createForClass(OkrProject);
