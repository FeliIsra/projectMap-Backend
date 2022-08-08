import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FactorDTO, PestelDTO } from './pestel.dto';
import { PestelService } from './pestel.service';

@Controller('pestel')
export class PestelController {
  constructor(private pestelService: PestelService) {}

  @Get('')
  async getAll() {
    const pestels = await this.pestelService.getAll();
    return pestels;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const pestel = await this.pestelService.getOne(id);
    return pestel;
  }

  @Post('')
  async insert(@Body() pestelDTO: PestelDTO) {
    const pestel = await this.pestelService.create(pestelDTO);
    return pestel;
  }

  @Post(':id/relation')
  async insertRelation(@Param('id') id: string, @Body() factorDTO: FactorDTO) {
    const pestel = await this.pestelService.insertFactor(id, factorDTO);
    return pestel;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() pestelDTO: PestelDTO) {
    const pestel = await this.pestelService.update(id, pestelDTO);
    return pestel;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const response = await this.pestelService.delete(id);
    return response;
  }

  @Delete(':id/factor/:idFactor')
  async deleteFactor(
    @Param('id') id: string,
    @Param('idFactor') idFactor: string,
  ) {
    const response = await this.pestelService.deleteFactor(id, idFactor);
    return response;
  }
}
