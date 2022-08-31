import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PorterDto } from './porter.dto';
import { Porter, PorterDocument, Pregunta } from './porter.schema';
import { Fuerza } from './fuerza';
import { NivelDeConcordancia } from './nivelDeConcordancia';
import { Valoracion } from './valoracion';
import { Ansoff } from '../ansoff/ansoff.schema';
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

  async findById(id: string) {
    return this.porterModel
      .findOne({
        _id: id,
      })
      .exec();
  }

  async getAllByProjectId(projectId: string) {
    return this.porterModel.find({ projectId: projectId }).exec();
  }

  calcularConsejosSegunFuerza(preguntas: [Pregunta], fuerza: Fuerza) {
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
      consejos.push({ consejo: consejo.consejo, factor: factor });
    }
  }
}
