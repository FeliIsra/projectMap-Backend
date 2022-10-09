import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { StickyNoteService } from './stickyNote.service';
import { Tool } from '../herramientas/tools';
import { StickyNoteDto } from './stickyNote.dto';

@UseGuards(AuthGuard('jwt'))
@ApiTags('sticky-notes')
@Controller('sticky-notes')
export class StickyNoteController {
  constructor(private stickyNoteService: StickyNoteService) {}

  @Get('tools/:tool/:toolId')
  async getAllForTool(
    @Param('tool') tool: Tool,
    @Param('toolId') toolId: string,
  ) {
    return this.stickyNoteService.findByToolId(tool, toolId);
  }

  @Get('projects/:projectId')
  async getAllForProject(@Param('projectId') projectId: string) {
    return this.stickyNoteService.findByProjectId(projectId);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.stickyNoteService.findById(id);
  }

  @Post()
  async create(@Req() req: any, @Body() stickyNoteDto: StickyNoteDto) {
    const { id: userId } = req.user;
    const stickyNote = await this.stickyNoteService.create(
      stickyNoteDto,
      userId,
    );
    return stickyNote;
  }

  @Put(':id')
  async edit(@Param('id') id: string, @Body() stickyNoteDto: StickyNoteDto) {
    return this.stickyNoteService.edit(id, stickyNoteDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.stickyNoteService.delete(id);
  }
}
