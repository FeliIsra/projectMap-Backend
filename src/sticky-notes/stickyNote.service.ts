import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StickyNote, StickyNoteDocument } from './stickyNote.schema';
import { Model } from 'mongoose';
import { StickyNoteDto } from './stickyNote.dto';
import { Tool } from '../herramientas/tools';

@Injectable()
export class StickyNoteService {
  constructor(
    @InjectModel(StickyNote.name)
    private stickyNoteModel: Model<StickyNoteDocument>,
  ) {}

  async create(stickyNoteDto: StickyNoteDto, userId: string) {
    const stickyNote = new StickyNote(
      stickyNoteDto.projectId,
      userId,
      stickyNoteDto.text,
      stickyNoteDto.position,
      stickyNoteDto.tool,
      stickyNoteDto.toolId,
    );
    return new this.stickyNoteModel(stickyNote).save();
  }

  async delete(stickyNoteId: string) {
    return this.stickyNoteModel.findByIdAndDelete(stickyNoteId);
  }

  async edit(stickyNoteId: string, stickyNoteDto: StickyNoteDto) {
    const stickyNote = await this.stickyNoteModel.findById(stickyNoteId);

    stickyNote.text = stickyNoteDto.text;
    stickyNote.position = stickyNoteDto.position;

    return new this.stickyNoteModel(stickyNote).save();
  }

  async findById(stickyNoteId: string) {
    return this.stickyNoteModel.findById(stickyNoteId).populate('author');
  }

  async findByToolId(tool: Tool, toolId: string) {
    return this.stickyNoteModel
      .find({
        tool: tool.valueOf(),
        toolId: toolId,
      })
      .populate('author');
  }

  async findByProjectId(projectId: string) {
    return this.stickyNoteModel
      .find({
        project: projectId,
      })
      .populate('author');
  }
}
