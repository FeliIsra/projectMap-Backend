import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {AnsoffService} from "./ansoff.service";
import {AnsoffRequestDto, AnsoffResponseDto, ProductoRequestDto} from "./ansoff.dto";
import {Ansoff} from "./ansoff.schema";

@Controller('ansoff')
export class AnsoffController {
    constructor(private ansoffService: AnsoffService) {
    }

    @Post('')
    async insert(@Body() ansoffDto: AnsoffRequestDto): Promise<Ansoff> {
        const ansoff = await this.ansoffService.create(ansoffDto);
        return ansoff;
    }

    @Get(':projectId')
    async find(@Param('projectId') projectId: string): Promise<AnsoffResponseDto> {
        const ansoff = await this.ansoffService.findByProjectId(projectId);
        return new AnsoffResponseDto(ansoff);
    }

    @Post(':projectId/products')
    async addProduct(@Param('projectId') projectId: string, @Body() productRequest: ProductoRequestDto): Promise<Ansoff> {
        const ansoff = await this.ansoffService.addProduct(projectId, productRequest);
        return ansoff;
    }

    @Put(':projectId/products/:nombre')
    async editProduct(@Param('projectId') projectId: string, @Body() productRequest: ProductoRequestDto): Promise<Ansoff> {
        const ansoff = await this.ansoffService.editProduct(projectId, productRequest);
        return ansoff;
    }

    @Delete(':projectId/products/:nombre')
    async deleteProduct(@Param('projectId') projectId: string, @Param('nombre') name: string) {
        const ansoff = await this.ansoffService.deleteProduct(projectId, name);
        return ansoff;
    }
}