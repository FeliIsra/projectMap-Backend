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
import { AnswerDto, QuestionnaireDto } from './questionnaire.dto';

@Controller('questionnaires')
@ApiTags('questionnaires')
@UseGuards(AuthGuard('jwt'))
export class QuestionnaireController {
  constructor(private questionnaireService: QuestionnaireService) {}

  @Get('questions')
  getQuestions() {
    return this.questionnaireService.getQuestions();
  }

  @Post('')
  create(@Body() questionnaireDto: QuestionnaireDto) {
    return this.questionnaireService.create(questionnaireDto);
  }

  @Put(':id/answers')
  answerQuestions(@Param('id') id: string, @Body() answers: AnswerDto[]) {
    return this.questionnaireService.answerQuestionnaire(id, answers);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.questionnaireService.findById(id);
  }

  @Get(':id/chapters/:chapterId/questions/:questionId')
  findQuestion(
    @Param('id') id: string,
    @Param('chapterId') chapterId: number,
    @Param('questionId') questionId: number,
  ) {
    return this.questionnaireService.getQuestion(id, chapterId, questionId);
  }

  @Put(':id/chapters/:chapterId/questions/:questionId/answers/:answerId')
  editAnswer(
    @Param('id') id: string,
    @Param('chapterId') chapterId: number,
    @Param('questionId') questionId: number,
    @Param('answerId') answerId: number,
  ) {
    return this.questionnaireService.editAnswer(
      id,
      chapterId,
      questionId,
      answerId,
    );
  }
}
