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
import { FodaService } from 'src/herramientas/foda/foda.service';
import { PestelService } from 'src/herramientas/pestel/pestel.service';
import { ProjectDto, ShareProjectDto } from './project.dto';
import { ProjectService } from './project.service';
import { AnsoffService } from '../herramientas/ansoff/ansoff.service';
import { ApiTags } from '@nestjs/swagger';
import { PorterService } from '../herramientas/porter/porter.service';
import { MckinseyService } from '../herramientas/mckinsey/mckinsey.service';
import { OkrService } from '../herramientas/okr/okr.service';
import { BalancedScorecardService } from 'src/herramientas/balancedScorecard/balancedScorecard.service';
import { QuestionnaireService } from '../herramientas/questionnaire/questionnaire.service';

@UseGuards(AuthGuard('jwt'))
@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private fodaService: FodaService,
    private pestelService: PestelService,
    private ansoffService: AnsoffService,
    private porterService: PorterService,
    private mckinseyService: MckinseyService,
    private okrService: OkrService,
    private balancedService: BalancedScorecardService,
    private questionnaireService: QuestionnaireService,
  ) {}

  @Get('')
  async getAllUserProjects(@Req() req: any) {
    const { id } = req.user;
    const projects = await this.projectService.findUserProjects(id);
    return projects;
  }

  @Get('shared')
  async getAllSharedProjects(@Req() req: any) {
    const { id: userId } = req.user;
    const projects = await this.projectService.findSharedProjects(userId);
    return projects;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
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

  @Get(':projectId/porter')
  async getPorter(@Param('projectId') projectId: string) {
    const porters = await this.porterService.getAllByProjectId(projectId);
    return porters;
  }

  @Get(':projectId/mckinsey')
  async getMcKinsey(@Param('projectId') projectId: string) {
    const mckinseys = await this.mckinseyService.getAllByProjectId(projectId);
    return mckinseys;
  }

  @Get(':projectId/okr-projects')
  async getOkr(@Param('projectId') projectId: string) {
    return this.okrService.getAllByProjectId(projectId);
  }

  @Get(':projectId/balanced-scorecards')
  async getBalancedScorecards(@Param('projectId') projectId: string) {
    return this.balancedService.getAllByProjectId(projectId);
  }

  @Get(':projectId/questionnaires')
  async getQuestionnaires(@Param('projectId') projectId: string) {
    return this.questionnaireService.findByProjectId(projectId);
  }

  @Post('')
  async insert(@Req() req: any, @Body() projectDTO: ProjectDto) {
    const { id } = req.user;

    projectDTO.owner = id;

    const project = await this.projectService.create(projectDTO);
    return project;
  }

  @Post(':projectId/share')
  async shareProject(
    @Param('projectId') projectId: string,
    @Body() shareProjectDto: ShareProjectDto,
  ) {
    const project = await this.projectService.shareProject(
      projectId,
      shareProjectDto.users,
    );
    return project;
  }

  @Delete(':projectId/share')
  async stopSharing(
    @Param('projectId') projectId: string,
    @Param('userId') userId: string,
  ) {
    const project = await this.projectService.removeUserFromProject(
      projectId,
      userId,
    );
    return project;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() projectDTO: ProjectDto) {
    const project = await this.projectService.update(id, projectDTO);
    return project;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const projectId = await this.projectService.delete(id);
    return {
      _id: projectId,
    };
  }
}
