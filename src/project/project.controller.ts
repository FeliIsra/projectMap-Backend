import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FodaService } from 'src/FODA/foda.service';
import { PestelService } from 'src/PESTEL/pestel.service';
import { ProjectDTO } from './project.dto';
import { ProjectService } from './project.service';

@UseGuards(AuthGuard('jwt'))
@Controller('project')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private fodaService: FodaService,
    private pestelService: PestelService,
  ) {}

  @Get('')
  async getAll() {
    const projects = await this.projectService.getAll();
    return projects;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const project = await this.projectService.getOne(id);
    return project;
  }

  @Get(':id/foda')
  async getFoda(@Param('id') id: string) {
    const fodas = await this.fodaService.getAllByProjectId(id);
    return fodas;
  }

  @Get(':id/pestel')
  async getPestel(@Param('id') id: string) {
    const pestels = await this.pestelService.getAllByProjectId(id);
    return pestels;
  }

  @Post('')
  async insert(@Body() projectDTO: ProjectDTO) {
    const project = await this.projectService.create(projectDTO);
    return project;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() projectDTO: ProjectDTO) {
    const project = await this.projectService.update(id, projectDTO);
    return project;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const response = await this.projectService.delete(id);
    return response;
  }
}
