import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PorterDto } from "./porter.dto";
import { Porter, PorterDocument } from "./porter.schema";

@Injectable()
export class PorterService {
    constructor(@InjectModel(Porter.name) private ansoffModel: Model<PorterDocument>) {
    }

    async create(porterDto: PorterDto) {
        const porter = new this.ansoffModel(porterDto);
        return porter.save();
    }


}