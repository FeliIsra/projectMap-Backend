import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PorterDto, PreguntaDto } from "./porter.dto";
import { Porter, PorterDocument } from "./porter.schema";

@Injectable()
export class PorterService {
    constructor(@InjectModel(Porter.name) private porterModel: Model<PorterDocument>) {
    }

    async create(porterDto: PorterDto) {
        const porter = new this.porterModel(porterDto);
        return porter.save();
    }

    async getAllByProjectId(projectId: string) {
        return this.porterModel.find({
            projectId: projectId
        }).exec();
    }

    async getPorterById(projectId: string,porterId: string) {
        return this.porterModel.find({
            projectId: projectId,
            _id: porterId
        }).exec();
    }

    async editQuestion(projectId: string,porterId:string, questionId: string, preguntaDto: PreguntaDto) {
        const porter: Porter = await (this.porterModel.findOne({projectId: projectId, _id:porterId}).exec());
        porter.preguntas = porter.preguntas.map(pregunta => {
                if (pregunta._id.toString() == questionId) {
                    pregunta.pregunta = preguntaDto.pregunta;
                    pregunta.fuerza = preguntaDto.fuerza.toString();
                    pregunta.valoracion = preguntaDto.valoracion.toString();
                    pregunta.nivelDeConcordancia = preguntaDto.nivelDeConcordancia;
                    return pregunta;
                }
                return pregunta;
            }
        )
        return new this.porterModel(porter).save();
    }




}