import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {PorterService} from "./porter.service";
import {PorterDto} from "./porter.dto";
import {Porter} from "./porter.schema";

@Controller('porter')
export class PorterController {
    constructor(private porterService: PorterService) {
    }

    @Post('')
    async insert(@Body() porterDto: PorterDto){
        const porter = await this.porterService.create(porterDto);
        return porter;
    }

    @Get(':projectId')
    async findPorters(@Param('projectId') projectId: string) {
        const porters = await this.porterService.getAllByProjectId(projectId);
        return porters;
    }

    @Get(':projectId/:porterId')
    async findPorter(@Param('projectId') projectId: string, @Param('porterId') porterId: string) {
        const porters = await this.porterService.getPorterById(projectId, porterId);
        return porters;
    }

   
    


}