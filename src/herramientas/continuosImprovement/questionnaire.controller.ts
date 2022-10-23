import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireDto } from './questionnaire.dto';

@Controller('questionnaires')
@ApiTags('questionnaires')
@UseGuards(AuthGuard('jwt'))
export class QuestionnaireController {
  constructor(private questionnaireService: QuestionnaireService) {}

  @Get('questions')
  getOptions() {
    return this.questionnaireService.getQuestions();
  }

  @Post('')
  create(@Body() questionnaireDto: QuestionnaireDto) {
    return this.questionnaireService.create(questionnaireDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.questionnaireService.findById(id);
  }

  @Get(':id/questions/:questionId')
  findQuestion(
    @Param('id') id: string,
    @Param('questionId') questionId: number,
  ) {
    return this.questionnaireService.getQuestion(id, questionId);
  }

  @Put(':id/questions/:questionId/answers/:answerId')
  editAnswer(
    @Param('id') id: string,
    @Param('questionId') questionId: number,
    @Param('answerId') answerId: number,
  ) {
    return this.questionnaireService.editAnswer(id, questionId, answerId);
  }
}
