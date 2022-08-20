import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PorterDto } from "./porter.dto";
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

  




}