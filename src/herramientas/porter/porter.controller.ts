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

   
}