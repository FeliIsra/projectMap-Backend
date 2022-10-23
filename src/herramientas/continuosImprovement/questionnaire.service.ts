import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Answer,
  Questionnaire,
  QuestionnaireDocument,
  Question,
} from './questionnaire.schema';
import { Questions } from './questions';
import { QuestionnaireDto } from './questionnaire.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire.name)
    private questionnaireModel: Model<QuestionnaireDocument>,
  ) {}

  async create(questionnaireDto: QuestionnaireDto) {
    const questions = await this.getQuestions();

    questionnaireDto.answers.forEach((answer) => {
      const question = questions.find(
        (question) => question.questionId == answer.questionId,
      );
      if (!question)
        throw new HttpException(
          'Question not found for id:' + answer.questionId,
          HttpStatus.NOT_FOUND,
        );
      else question.selectedAnswer = answer.answerId;
    });
    const questionnaire = new Questionnaire(
      questionnaireDto.projectId,
      questionnaireDto.titulo,
      questionnaireDto.createdAt,
      questions,
    );
    return new this.questionnaireModel(questionnaire).save();
  }

  async findById(id: string) {
    return this.questionnaireModel.findById(id);
  }

  async findByProjectId(projectId: string) {
    return this.questionnaireModel.find({ projectId: projectId });
  }

  async getQuestions() {
    const questions = [];
    for (const [id, question] of Object.entries(Questions.getQuestions)) {
      const questionObject = new Question(
        parseInt(id),
        question.question,
        [],
        question.right_answer,
        undefined,
      );

      for (const [answerId, answerText] of Object.entries(question.answers)) {
        const answerObject = new Answer(parseInt(answerId), answerText);
        questionObject.answers.push(answerObject);
      }
      questions.push(questionObject);
    }
    return questions;
  }

  async getQuestion(id: string, questionId: number) {
    const questionnaire = await this.questionnaireModel.findById(id);

    return questionnaire.questions.find(
      (question) => question.questionId == questionId,
    );
  }

  async editAnswer(id: string, questionId: number, answerId: number) {
    const questionnaire = await this.questionnaireModel.findById(id);

    const question = questionnaire.questions.find(
      (question) => question.questionId == questionId,
    );
    if (question.answers.find((answer) => answer.answerId == answerId))
      question.selectedAnswer = answerId;
    else throw new HttpException('Answer not found', HttpStatus.NOT_FOUND);

    return new this.questionnaireModel(questionnaire).save();
  }
}
