import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MckinseyService } from './mckinsey.service';
import { McKinseyDto, UnidadDeNegocioDto } from './mckinsey.dto';

@Controller('mckinsey')
export class MckinseyController {
  constructor(private mckinseyService: MckinseyService) {}

  @Post('')
  async insert(@Body() mcKinseyDto: McKinseyDto) {
    const mckinsey = await this.mckinseyService.create(mcKinseyDto);
    return mckinsey;
  }

  @Get('projects/:projectId')
  async findPorters(@Param('projectId') projectId: string) {
    const mcKinsey = await this.mckinseyService.getAllByProjectId(projectId);
    return mcKinsey;
  }

  @Get(':mcKinseyId')
  async findPorter(@Param('mcKinseyId') mcKinseyId: string) {
    const mcKinsey = await this.mckinseyService.findById(mcKinseyId);
    return mcKinsey;
  }

  @Put(':mcKinseyId/unidades/:unidadId')
  async editQuestion(
    @Param('porterId') porterId: string,
    @Param('unidadId') questionId: string,
    @Body() questionDto: UnidadDeNegocioDto,
  ) {
    const mcKinsey = await this.mckinseyService.editUnidadDeNegocio(
      porterId,
      questionId,
      questionDto,
    );
    return mcKinsey;
  }
}
