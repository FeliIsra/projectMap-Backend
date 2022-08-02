import { Body, Controller, Get, Post } from '@nestjs/common';
import { FodaDTO } from './foda.dto';
import { FodaService } from './foda.service';

@Controller('foda')
export class FodaController {
  constructor(private fodaService: FodaService) {}

  @Get('')
  async getAll() {
    const fodas = await this.fodaService.getAll();
    return fodas;
  }

  @Post('')
  async insert(@Body() fodaDTO: FodaDTO) {
    const foda = await this.fodaService.create(fodaDTO);
    return foda;
  }
}
