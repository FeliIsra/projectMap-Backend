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
export class Questionnaire {
  @Prop({ required: true })
  projectId: string;

  @Prop({ type: String })
  titulo: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop([questionSchema])
  questions: Question[];

  constructor(
    projectId: string,
    titulo: string,
    createdAt: Date,
    questions: Question[],
  ) {
    this.projectId = projectId;
    this.titulo = titulo;
    this.createdAt = createdAt;
    this.questions = questions;
  }
}
export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
