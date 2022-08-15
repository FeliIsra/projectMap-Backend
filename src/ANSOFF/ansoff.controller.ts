import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {AnsoffService} from "./ansoff.service";
import {AnsoffDto} from "./ansoff.dto";

@Controller('ansoff')
export class AnsoffController {
    constructor(private ansoffService: AnsoffService) {
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        const ansoffs = await this.ansoffService.findByProjectId(id);
        return ansoffs;
    }


    @Post('')
    async insert(@Body() ansoffDto: AnsoffDto) {
        const ansoff = await this.ansoffService.create(ansoffDto);
        return ansoff;
    }
}