import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Roles } from './user.roles';
import { Project } from '../project/project.schema';
import { Consultora } from '../consultora/consultora.schema';

@Schema()
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, default: 'Free' })
  role: Roles;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
  sharedProjects: Project[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Consultora' })
  consultora: Consultora;

  @Prop({ type: String })
  calendlyUser: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
