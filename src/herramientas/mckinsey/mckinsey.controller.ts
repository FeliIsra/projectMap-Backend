import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
  async findByProjectId(@Param('projectId') projectId: string) {
    const mcKinsey = await this.mckinseyService.getAllByProjectId(projectId);
    return mcKinsey;
  }

  @Get(':mcKinseyId')
  async findById(@Param('mcKinseyId') mcKinseyId: string) {
    const mcKinsey = await this.mckinseyService.findById(mcKinseyId);
    return mcKinsey;
  }

  @Put(':mcKinseyId/unidades/:unidadId')
  async editUnidadDeNegocio(
    @Param('mcKinseyId') porterId: string,
    @Param('unidadId') unidadId: string,
    @Body() unidadDeNegocioDto: UnidadDeNegocioDto,
  ) {
    const mcKinsey = await this.mckinseyService.editUnidadDeNegocio(
      porterId,
      unidadId,
      unidadDeNegocioDto,
    );
    return mcKinsey;
  }

  @Delete(':mcKinseyId/unidades/:unidadId')
  async removeUnidadDeNegocio(
    @Param('mcKinseyId') porterId: string,
    @Param('unidadId') questionId: string,
  ) {
    const mcKinsey = await this.mckinseyService.removeUnidadDeNegocio(
      porterId,
      questionId,
    );
    return mcKinsey;
  }

  @Post(':mcKinseyId/unidades')
  async addUnidadDeNegocio(
    @Param('mcKinseyId') porterId: string,
    @Body() unidadDeNegocioDto: UnidadDeNegocioDto,
  ) {
    const mcKinsey = await this.mckinseyService.addUnidadDeNegocio(
      porterId,
      unidadDeNegocioDto,
    );
    return mcKinsey;
  }
}
