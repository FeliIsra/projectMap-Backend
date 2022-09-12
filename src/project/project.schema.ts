import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Project {
  @Prop({ type: String, require: true })
  owner: string;

  @Prop({ type: String, require: true })
  titulo: string;

  @Prop({ type: String, require: true })
  descripcion: string;

  @Prop({ type: String, require: true })
  color: string;

  @Prop({ type: [String], require: true })
  sharedUsers: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
