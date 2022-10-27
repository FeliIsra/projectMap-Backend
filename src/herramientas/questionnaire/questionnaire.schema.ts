import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type QuestionnaireDocument = Questionnaire & Document;

@Schema()
export class Answer {
  @Prop({ type: Number, required: true })
  answerId: number;

  @Prop({ type: String, required: true })
  answer: string;

  constructor(answerId: number, answer: string) {
    this.answerId = answerId;
    this.answer = answer;
  }
}
const answerSchema = SchemaFactory.createForClass(Answer);

@Schema()
export class Question {
  @Prop({ type: Number, required: true })
  questionId: number;

  @Prop({ type: String, required: true })
  question: string;

  @Prop([answerSchema])
  answers: Answer[];

  @Prop({ type: Number, required: true })
  rightAnswer: number;

  @Prop({ type: Number })
  selectedAnswer: number;

  constructor(
    questionId: number,
    question: string,
    answers: Answer[],
    rightAnswer: number,
    selectedAnswer: number,
  ) {
    this.questionId = questionId;
    this.question = question;
    this.answers = answers;
    this.rightAnswer = rightAnswer;
    this.selectedAnswer = selectedAnswer;
  }
}
const questionSchema = SchemaFactory.createForClass(Question);

@Schema()
export class Chapter {
  @Prop({ type: Number, required: true })
  chapterId: number;

  @Prop({ type: String, required: true })
  title: string;

  @Prop([String])
  presentations: string[];

  constructor(
    chapterId: number,
    title: string,
    questions: Question[],
    presentations: string[],
  ) {
    this.chapterId = chapterId;
    this.title = title;
    this.presentations = presentations;
    this.questions = questions;
  }

  @Prop([questionSchema])
  questions: Question[];
}
const chapterSchema = SchemaFactory.createForClass(Chapter);

@Schema()
export class Questionnaire {
  @Prop({ required: true })
  projectId: string;

  @Prop({ type: String })
  titulo: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop([chapterSchema])
  chapters: Chapter[];

  constructor(
    projectId: string,
    titulo: string,
    createdAt: Date,
    chapters: Chapter[],
  ) {
    this.projectId = projectId;
    this.titulo = titulo;
    this.createdAt = createdAt;
    this.chapters = chapters;
  }
}
export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
