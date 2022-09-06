import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
  async findByProjectId(@Param('projectId') projectId: string) {
    const porters = await this.porterService.getAllByProjectId(projectId);
    return porters;
  }

  @Get(':porterId')
  async findById(@Param('porterId') porterId: string) {
    const porters = await this.porterService.getPorterById(porterId);
    return porters;
  }

  @Put(':porterId/preguntas/:questionId')
  async editQuestion(
    @Param('porterId') porterId: string,
    @Param('questionId') questionId: string,
    @Body() questionDto: PreguntaDto,
  ) {
    const porter = await this.porterService.editQuestion(
      porterId,
      questionId,
      questionDto,
    );
    return porter;
  }

  @Get(':porterId/consejos')
  async getConsejos(@Param('porterId') porterId: string) {
    const porter = await this.porterService.getPorterById(porterId);
    return this.porterService.calcularConsejos((porter as Porter).preguntas);
  }
}
