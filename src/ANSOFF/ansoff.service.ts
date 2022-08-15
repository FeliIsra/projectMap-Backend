import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Ansoff, AnsoffDocument} from "./ansoff.schema";
import {Model} from "mongoose";
import {AnsoffDto} from "./ansoff.dto";

@Injectable()
export class AnsoffService {
    constructor(@InjectModel(Ansoff.name) private ansoffModel: Model<AnsoffDocument>) {
    }

    async create(ansoffDto: AnsoffDto): Promise<Ansoff> {
        const ansoff = new this.ansoffModel(ansoffDto);
        return ansoff.save();
    }

    //TODO
    async findByProjectId(id: string): Promise<Ansoff> {
        return this.ansoffModel.findById(id).exec();
    }

}