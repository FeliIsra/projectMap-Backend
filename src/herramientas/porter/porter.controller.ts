import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PorterService } from './porter.service';
import { PorterDto, PreguntaDto } from './porter.dto';
import { Porter } from './porter.schema';

@Controller('porter')
export class PorterController {
  constructor(private porterService: PorterService) {}

  @Post('')
  async insert(@Body() porterDto: PorterDto) {
    const porter = await this.porterService.create(porterDto);
    return porter;
  }

  @Get('options')
  async getOptions() {
    return await this.porterService.getOptions();
  }

  @Get('preguntas')
  async getPreguntas() {
    return this.porterService.getPreguntas();
  }

  @Get(':projectId')
  async findPorters(@Param('projectId') projectId: string) {
    const porters = await this.porterService.getAllByProjectId(projectId);
    return porters;
  }

  @Get(':projectId/:porterId')
  async findPorter(
    @Param('projectId') projectId: string,
    @Param('porterId') porterId: string,
  ) {
    const porters = await this.porterService.getPorterById(projectId, porterId);
    return porters;
  }

  @Put(':projectId/:porterId/preguntas/:questionId')
  async editQuestion(
    @Param('projectId') projectId: string,
    @Param('porterId') porterId: string,
    @Param('questionId') questionId: string,
    @Body() questionDto: PreguntaDto,
  ) {
    const porter = await this.porterService.editQuestion(
      projectId,
      porterId,
      questionId,
      questionDto,
    );
    return porter;
  }

  @Get(':projectId/:porterId/consejos')
  async getConsejos(
    @Param('projectId') projectId: string,
    @Param('porterId') porterId: string,
  ) {
    const porter = await this.porterService.getPorterById(projectId, porterId);
    return this.porterService.calcularConsejos((porter as Porter).preguntas);
  }
}
