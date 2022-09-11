import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FactorDTO, PestelDTO } from './pestel.dto';
import { PestelService } from './pestel.service';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('pestel')
@Controller('pestel')
export class PestelController {
  constructor(private pestelService: PestelService) {}

  @Get('')
  async getAll() {
    const pestels = await this.pestelService.getAll();
    return pestels;
  }

  @Get('options')
  async getOptions() {
    return await this.pestelService.getOptions();
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

  @Post(':id/factor')
  async insertRelation(@Param('id') id: string, @Body() factorDTO: FactorDTO) {
    const pestel = await this.pestelService.insertFactor(id, factorDTO);
    return pestel;
  }

  @Put(':id')
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
  @Put(':id/factor/:idFactor')
  async editFactor(
    @Param('id') id: string,
    @Param('idFactor') idFactor: string,
    @Body() updatedFactor: FactorDTO,
  ) {
    const response = await this.pestelService.editFactor(
      id,
      idFactor,
      updatedFactor,
    );
    return response;
  }
}
