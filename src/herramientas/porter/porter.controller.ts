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
import { BulkEditQuestions, PorterDto, PreguntaDto } from './porter.dto';
import { Porter, Pregunta } from './porter.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('porter')
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

  @Get(':porterId')
  async findById(@Param('porterId') porterId: string) {
    const porters = await this.porterService.getPorterById(porterId);
    return porters;
  }

  @Delete(':porterId')
  async delete(@Param('porterId') porterId: string) {
    return this.porterService.deletePorter(porterId);
  }

  @Post(':porterId/preguntas')
  async addPregunta(
    @Param('porterId') porterId: string,
    @Body() question: PreguntaDto,
  ) {
    return this.porterService.addQuestion(porterId, question);
  }

  @Delete(':porterId/preguntas/:questionId')
  async deletePregunta(
    @Param('porterId') porterId: string,
    @Param('questionId') questionId: string,
  ) {
    return this.porterService.deleteQuestion(porterId, questionId);
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

  @Post(':porterId/preguntas/replace')
  async replaceQuestions(
    @Param('porterId') porterId: string,
    @Body() questions: BulkEditQuestions,
  ) {
    return this.porterService.replaceQuestions(porterId, questions);
  }

  @Get(':porterId/consejos')
  async getConsejos(@Param('porterId') porterId: string) {
    const porter = await this.porterService.getPorterById(porterId);
    return this.porterService.calcularConsejos((porter as Porter).preguntas);
  }
}
