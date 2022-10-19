import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tool } from '../herramientas/tools';
import mongoose, { Document } from 'mongoose';
import { Ansoff } from '../herramientas/ansoff/ansoff.schema';

export type StickyNoteDocument = StickyNote & Document;

@Schema()
export class StickyNote {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  projectId: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  author: string;

  @Prop({ type: String })
  text: string;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Number })
  position: number;

  @Prop({ type: String })
  tool: Tool;

  @Prop({ type: String })
  toolId: string;

  constructor(
    projectId: string,
    author: string,
    text: string,
    position: number,
    tool: Tool,
    toolId: string,
  ) {
    this.projectId = projectId;
    this.author = author;
    this.text = text;
    this.position = position;
    this.tool = tool;
    this.toolId = toolId;
  }
}
export const StickyNoteSchema = SchemaFactory.createForClass(StickyNote);
