import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from '../../project/project.service';
import { FodaService } from '../foda/foda.service';
import { PestelService } from '../pestel/pestel.service';
import { AnsoffService } from '../ansoff/ansoff.service';
import { PorterService } from '../porter/porter.service';
import { MckinseyService } from '../mckinsey/mckinsey.service';
import { OkrService } from '../okr/okr.service';
import { BalancedScorecardService } from '../balancedScorecard/balancedScorecard.service';
import { QuestionnaireService } from '../continuosImprovement/questionnaire.service';

@UseGuards(AuthGuard('jwt'))
@ApiTags('continuous-improvements"')
@Controller('continuous-improvements')
export class ContinuousImprovementController {
  constructor(
    private fodaService: FodaService,
    private pestelService: PestelService,
    private ansoffService: AnsoffService,
    private porterService: PorterService,
    private mckinseyService: MckinseyService,
    private okrService: OkrService,
    private balancedService: BalancedScorecardService,
    private questionnaireService: QuestionnaireService,
  ) {}

  @Get(':projectId')
  async getContinuousImprovement(@Param('projectId') projectId: string) {
    const fodas = await this.fodaService.getAllByProjectId(projectId);
    const pestels = await this.pestelService.getAllByProjectId(projectId);
    const ansoffs = await this.ansoffService.getAllByProjectId(projectId);
    const porters = await this.porterService.getAllByProjectId(projectId);
    const mckinseys = await this.mckinseyService.getAllByProjectId(projectId);
    const okrs = await this.okrService.getAllByProjectId(projectId);
    const balancedScorecards = await this.balancedService.getAllByProjectId(
      projectId,
    );
    return {
      fodas: fodas.slice(0, 2),
      pestels: pestels.slice(0, 1),
      ansoffs: ansoffs.slice(0, 2),
      porters: porters.slice(0, 2),
      mckinseys: mckinseys.slice(0, 1),
      okrs: okrs.slice(0, 1),
      balancedScorecards: balancedScorecards.slice(0, 1),
    };
  }
}
