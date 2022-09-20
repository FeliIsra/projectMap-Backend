import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PorterDto,
  PreguntaDto,
  BulkEditQuestions,
  BulkQuestionItem,
} from './porter.dto';
import { Porter, PorterDocument, Pregunta } from './porter.schema';
import { Fuerza } from './fuerza';
import { NivelDeConcordancia } from './nivelDeConcordancia';
import { Valoracion } from './valoracion';
import { Preguntas } from './preguntas';
import { Consejos } from './consejos';

@Injectable()
export class PorterService {
  constructor(
    @InjectModel(Porter.name) private porterModel: Model<PorterDocument>,
  ) {}

  async create(porterDto: PorterDto) {
    const porter = new this.porterModel(porterDto);
    return porter.save();
  }

  async getOptions() {
    return {
      ['fuerza']: Object.values(Fuerza),
      ['nivelDeConcordancia']: Object.values(NivelDeConcordancia),
      ['valoracion']: Object.values(Valoracion),
    };
  }

  async getPorterById(porterId: string) {
    return this.porterModel
      .findOne({
        _id: porterId,
      })
      .exec();
  }

  async editQuestion(
    porterId: string,
    questionId: string,
    preguntaDto: PreguntaDto,
  ) {
    const porter: Porter = await this.porterModel
      .findOne({ _id: porterId })
      .exec();
    porter.preguntas = porter.preguntas.map((pregunta) => {
      if (pregunta._id.toString() == questionId) {
        pregunta.valoracion = preguntaDto.valoracion.toString();
        pregunta.nivelDeConcordancia = preguntaDto.nivelDeConcordancia;
        return pregunta;
      }
      return pregunta;
    });
    return new this.porterModel(porter).save();
  }

  async deleteQuestion(porterId: string, questionId: string) {
    const porter: Porter = await this.porterModel
      .findOne({ _id: porterId })
      .exec();
    porter.preguntas = porter.preguntas.filter((pregunta) => {
      return pregunta._id.toString() != questionId;
    });
    return new this.porterModel(porter).save();
  }

  async addQuestion(porterId: string, preguntaDto: PreguntaDto) {
    const porter: Porter = await this.porterModel
      .findOne({ _id: porterId })
      .exec();

    const question = new Pregunta(
      preguntaDto.preguntaId,
      preguntaDto.fuerza,
      preguntaDto.nivelDeConcordancia,
      preguntaDto.valoracion,
    );
    porter.preguntas.push(question);
    return new this.porterModel(porter).save();
  }

  async replaceQuestions(
    porterId: string,
    questionsByFuerza: BulkEditQuestions,
  ) {
    const newQuestions = [];

    Object.entries(questionsByFuerza.preguntas).forEach(
      ([fuerza, questions]) => {
        Object.entries(questions).forEach(([questionId, questionObject]) => {
          const question = questionObject as BulkQuestionItem;
          const preguntaDto = new Pregunta(
            parseInt(questionId),
            fuerza as Fuerza,
            question.nivelDeConcordancia,
            question.valoracion,
          );

          newQuestions.push(preguntaDto);
        });
      },
    );

    const porter: Porter = await this.porterModel.findById(porterId).exec();
    porter.preguntas = newQuestions;
    return new this.porterModel(porter).save();
  }
  async getAllByProjectId(projectId: string) {
    return this.porterModel.find({ projectId: projectId }).exec();
  }

  async deletePorter(porterId: string) {
    return this.porterModel.findByIdAndDelete(porterId).exec();
  }

  getPreguntas() {
    return {
      [Fuerza.RIVALIDAD_ENTRE_COMPETIDORES]:
        Preguntas.rivalidadEntreCompetidores,
      [Fuerza.PODER_DE_NEGOCIACION_CON_LOS_CLIENTES]:
        Preguntas.poderDeNegociacionConElCliente,
      [Fuerza.PODER_DE_NEGOCIACION_CON_LOS_PROVEEDORES]:
        Preguntas.poderDeNegociacionConProveedores,
      [Fuerza.AMENAZA_DE_NUEVOS_COMPETIDORES]:
        Preguntas.amenazaDeNuevosCompetidores,
      [Fuerza.AMENAZA_DE_PRODUCTOS_SUBSTITUTOS]: Preguntas.amenazaDeSustitucion,
    };
  }

  calcularConsejos(preguntas: Pregunta[]) {
    return Object.values(Fuerza).map((fuerza) => {
      return this.calcularConsejosSegunFuerza(preguntas, fuerza);
    });
  }

  private calcularConsejosSegunFuerza(preguntas: Pregunta[], fuerza: Fuerza) {
    const preguntasConPuntaje: Map<number, number> = new Map();
    preguntas
      .filter((p) => p.fuerza == fuerza)
      .map(function (pregunta) {
        const puntaje = Preguntas.calcularPuntaje(
          pregunta.nivelDeConcordancia as NivelDeConcordancia,
          pregunta.valoracion as Valoracion,
        );
        preguntasConPuntaje.set(pregunta.preguntaId, puntaje);
      });

    const consejos = [];
    const consejosDeFuerza = Consejos.getConsejos(fuerza);
    for (const [id, consejo] of Object.entries(consejosDeFuerza)) {
      const puntaje = preguntasConPuntaje.get(consejo.pregunta);
      const factor = puntaje + Number(id) / 10000;
      if (puntaje) consejos.push({ consejo: consejo.consejo, factor: factor });
    }

    const consejoGeneral = this.calcularConsejoGeneral(
      preguntasConPuntaje,
      fuerza,
    );

    return {
      fuerza: fuerza,
      consejoGeneral: consejoGeneral,
      consejos: consejos
        .sort((a, b) => -(a.factor - b.factor))
        .splice(0, 5)
        .map((consejo) => consejo.consejo),
    };
  }

  private calcularConsejoGeneral(
    preguntasConPuntaje: Map<number, number>,
    fuerza: Fuerza,
  ) {
    let accum = 0;
    preguntasConPuntaje.forEach((value, _) => (accum = accum + value));
    if (accum > 40)
      return (
        'Este índice es muy alto, lo que quiere decir que su estrategia debe siempre tener en cuenta la ' +
        fuerza +
        ', siga los consejos priorizados de acuerdo a su situación!'
      );
    else if (accum > 30)
      return 'Este índice es medio, lo que quiere decir que ese no es un punto prioritario en su estrategia, pero merece atención constante, siga los principales consejos propuestos.';
    else
      return 'La fuerza de ese índice es baja, lo que significa que éste no es un elemento prioritario en su estrategia.';
  }
}
