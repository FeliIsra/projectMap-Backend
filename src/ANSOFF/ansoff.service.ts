import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Ansoff, AnsoffDocument, Producto} from "./ansoff.schema";
import {Model} from "mongoose";
import {AnsoffRequestDto, ProductoRequestDto} from "./ansoff.dto";

@Injectable()
export class AnsoffService {
    constructor(@InjectModel(Ansoff.name) private ansoffModel: Model<AnsoffDocument>) {
    }

    async create(ansoffDto: AnsoffRequestDto): Promise<Ansoff> {
        const ansoff = new this.ansoffModel(ansoffDto);
        return ansoff.save();
    }

    async addProduct(projectId: string, productRequest: ProductoRequestDto): Promise<Ansoff> {
        const ansoff: Ansoff = await (this.ansoffModel.findOne({projectId: projectId}).exec());
        ansoff.productos.push(new Producto(productRequest.nombre, productRequest.situacionDelMercado, productRequest.situacionDelProducto, productRequest.exito))
        return new this.ansoffModel(ansoff).save();
    }

    async editProduct(projectId: string, productRequest: ProductoRequestDto): Promise<Ansoff> {
        const ansoff: Ansoff = await (this.ansoffModel.findOne({projectId: projectId}).exec());
        ansoff.productos = ansoff.productos.map(product => {
                if (product.nombre == productRequest.nombre) {
                    return new Producto(productRequest.nombre, productRequest.situacionDelMercado, productRequest.situacionDelProducto, productRequest.exito);
                }
                return product;
            }
        )
        return new this.ansoffModel(ansoff).save();
    }

    async deleteProduct(projectId: string, name: string) {
        const ansoff: Ansoff = await (this.ansoffModel.findOne({projectId: projectId}).exec());
        ansoff.productos = ansoff.productos.filter(product => product.nombre != name)
        return new this.ansoffModel(ansoff).save();
    }


    async findByProjectId(projectId: string): Promise<Ansoff> {
        return this.ansoffModel.findOne({
            projectId: projectId
        }).exec();
    }

}