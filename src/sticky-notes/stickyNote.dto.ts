import { Prop } from '@nestjs/mongoose';
import { Tool } from '../herramientas/tools';

export class StickyNoteDto {
  projectId: string;

  text: string;

  position: number;

  tool: Tool;

  toolId: string;
}
