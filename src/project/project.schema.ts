import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user/user.schema';

@Schema()
export class Project {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({ type: String, require: true })
  titulo: string;

  @Prop({ type: String, require: true })
  descripcion: string;

  @Prop({ type: String, require: true })
  color: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sharedUsers: User[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
