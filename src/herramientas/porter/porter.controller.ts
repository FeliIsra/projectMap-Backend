import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PorterService } from './porter.service';
import { PorterDto } from './porter.dto';
import { Fuerza } from './fuerza';
import { NivelDeConcordancia } from './nivelDeConcordancia';
import { Valoracion } from './valoracion';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('porter')
export class PorterController {
  constructor(private porterService: PorterService) {}

  @Post('')
  async insert(@Body() porterDto: PorterDto) {
    const porter = await this.porterService.create(porterDto);
    return porter;
  }

  @Get('options')
  async getOptions() {
    return await this.porterService.getOptions();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.porterService.findById(id);
  }
}
