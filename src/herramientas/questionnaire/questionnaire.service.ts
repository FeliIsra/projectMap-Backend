import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Answer,
  Questionnaire,
  QuestionnaireDocument,
  Question,
  Chapter,
} from './questionnaire.schema';
import { Questionnaires } from './questionnaires';
import { AnswerDto, QuestionnaireDto } from './questionnaire.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire.name)
    private questionnaireModel: Model<QuestionnaireDocument>,
  ) {}

  async create(questionnaireDto: QuestionnaireDto) {
    const chapters = await this.getQuestions();
    const questionnaire = new Questionnaire(
      questionnaireDto.projectId,
      questionnaireDto.titulo,
      questionnaireDto.createdAt,
      chapters,
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
    const chapters = [];

    for (const [chapterId, chapter] of Object.entries(
      Questionnaires.getChapters,
    )) {
      const questions = [];
      for (const [id, question] of Object.entries(chapter.questions)) {
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
      const chapterObject = new Chapter(
        parseInt(chapterId),
        chapter.title,
        questions,
        chapter.presentations,
      );

      chapters.push(chapterObject);
    }

    return chapters;
  }

  async getQuestion(id: string, chapterId: number, questionId: number) {
    const questionnaire = await this.questionnaireModel.findById(id);
    const chapter = questionnaire.chapters.find(
      (chapter) => chapter.chapterId == chapterId,
    );
    chapter?.questions.find((question) => question.questionId == questionId);
  }

  async editAnswer(
    id: string,
    chapterId: number,
    questionId: number,
    answerId: number,
  ) {
    const questionnaire = await this.questionnaireModel.findById(id);
    const chapter = questionnaire.chapters.find(
      (chapter) => chapter.chapterId == chapterId,
    );
    const question = chapter?.questions.find(
      (question) => question.questionId == questionId,
    );

    if (question.answers.find((answer) => answer.answerId == answerId))
      question.selectedAnswer = answerId;
    else throw new HttpException('Answer not found', HttpStatus.NOT_FOUND);

    return new this.questionnaireModel(questionnaire).save();
  }

  async answerQuestionnaire(id: string, answers: AnswerDto[]) {
    const questionnaire = await this.questionnaireModel.findById(id);

    answers.forEach((answer) => {
      const chapter = questionnaire.chapters.find(
        (chapter) => chapter.chapterId == answer.chapterId,
      );
      const question = chapter?.questions.find(
        (question) => question.questionId == answer.questionId,
      );

      if (question.answers.find((answer) => answer.answerId == answer.answerId))
        question.selectedAnswer = answer.answerId;
      else throw new HttpException('Answer not found', HttpStatus.NOT_FOUND);
    });

    return new this.questionnaireModel(questionnaire).save();
  }

  async delete(id: string) {
    const result = await this.questionnaireModel.deleteOne({ _id: id });
    if (result.deletedCount) return id;
    else
      throw new HttpException('Questionnaire not found', HttpStatus.NOT_FOUND);
  }
}
