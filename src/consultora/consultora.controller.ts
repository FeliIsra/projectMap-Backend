import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  AssignProjectDto,
  ConsultantDto,
  ConsultoraDto,
} from './consultora.dto';
import { ConsultoraService } from './consultora.service';

@ApiTags('consultoras')
@Controller('consultoras')
export class ConsultoraController {
  constructor(private consultoraService: ConsultoraService) {}

  @Post('')
  async create(@Body() consultoraDto: ConsultoraDto) {
    return this.consultoraService.create(consultoraDto);
  }

  @Get(':consultoraId')
  async findById(@Param('consultoraId') consultoraId: string) {
    return this.consultoraService.findById(consultoraId);
  }

  @Put(':consultoraId')
  async update(
    @Param('consultoraId') consultoraId: string,
    @Body() consultoraDto: ConsultoraDto,
  ) {
    return this.consultoraService.update(consultoraId, consultoraDto);
  }

  @Put(':consultoraId/admin')
  async assignAdmin(
    @Param('consultoraId') consultoraId: string,
    @Body() consultant: ConsultantDto,
  ) {
    return this.consultoraService.assignNewAdmin(
      consultoraId,
      consultant.email,
    );
  }

  @Put(':consultoraId/admin')
  async removeAdmin(
    @Param('consultoraId') consultoraId: string,
    @Body() consultant: ConsultantDto,
  ) {
    return this.consultoraService.removeAdmin(consultoraId);
  }

  @Put(':consultoraId/consultants/add')
  async assignConsultant(
    @Param('consultoraId') consultoraId: string,
    @Body() consultant: ConsultantDto,
  ) {
    return this.consultoraService.assignNewConsultant(
      consultoraId,
      consultant.email,
    );
  }

  @Put(':consultoraId/consultants/remove')
  async removeConsultant(
    @Param('consultoraId') consultoraId: string,
    @Body() consultant: ConsultantDto,
  ) {
    return this.consultoraService.removeConsultor(
      consultoraId,
      consultant.email,
    );
  }

  @Put(':consultoraId/consultants/projects/add')
  async assignProjectsToConsultant(
    @Param('consultoraId') consultoraId: string,
    @Body() assignProject: AssignProjectDto,
  ) {
    return this.consultoraService.assignProjectsToConsultant(
      consultoraId,
      assignProject.email,
      assignProject.projects,
    );
  }

  @Put(':consultoraId/consultants/projects/remove')
  async removeProjectsToConsultant(
    @Param('consultoraId') consultoraId: string,
    @Body() assignProject: AssignProjectDto,
  ) {
    return this.consultoraService.removeProjectsToConsultant(
      consultoraId,
      assignProject.email,
      assignProject.projects,
    );
  }

  @Delete(':consultoraId')
  async delete(@Param('consultoraId') consultoraId: string) {
    return this.consultoraService.delete(consultoraId);
  }

  @Post(':consultoraId/projects/:projectId')
  async addProject(
    @Param('consultoraId') consultoraId: string,
    @Param('projectId') projectId: string,
  ) {
    return this.consultoraService.addProject(consultoraId, projectId);
  }

  @Delete(':consultoraId/projects/:projectId')
  async removeProject(
    @Param('consultoraId') consultoraId: string,
    @Param('projectId') projectId: string,
  ) {
    return this.consultoraService.removeProject(consultoraId, projectId);
  }
}
