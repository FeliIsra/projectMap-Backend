import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FodaService } from 'src/herramientas/foda/foda.service';
import { PestelService } from 'src/herramientas/pestel/pestel.service';
import { ProjectDTO, PuedeVerDTO } from './project.dto';
import { ProjectService } from './project.service';
import { AnsoffService } from '../herramientas/ansoff/ansoff.service';

@UseGuards(AuthGuard('jwt'))
@Controller('projects')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private fodaService: FodaService,
    private pestelService: PestelService,
    private ansoffService: AnsoffService,
  ) {}

  @Get('')
  async getAll(@Req() req: any) {
    const { id } = req.user;
    const projects = await this.projectService.getAll(id);
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

  @Get(':id/ansoff')
  async getAnsoff(@Param('id') id: string) {
    const ansoffs = await this.ansoffService.getAllByProjectId(id);
    return ansoffs;
  }

  @Post('')
  async insert(@Req() req: any, @Body() projectDTO: ProjectDTO) {
    const { id } = req.user;

    projectDTO.owner = id;
    projectDTO.puedenVer = [id];

    const project = await this.projectService.create(projectDTO);
    return project;
  }

  @Post(':id/puedeVer')
  async insertPuedeVer(
    @Param('id') id: string,
    @Body() puedeVerDTO: PuedeVerDTO,
  ) {
    const project = await this.projectService.createPuedeVer(
      id,
      puedeVerDTO.puedeVer,
    );
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
