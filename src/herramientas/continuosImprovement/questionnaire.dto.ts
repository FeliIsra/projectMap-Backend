export class AnswerDto {
  questionId: number;
  answerId: number;
}

export class QuestionnaireDto {
  projectId: string;
  titulo: string;
  createdAt: Date;
  answers: AnswerDto[];
}
