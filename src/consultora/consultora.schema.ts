import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Project } from '../project/project.schema';
import { User } from '../user/user.schema';

@Schema()
export class Consultora {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  admin: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
  projects: Project[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  })
  consultants: User[];
}

export const ConsultoraSchema = SchemaFactory.createForClass(Consultora);
