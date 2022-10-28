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
import { FactorDto, PestelDto } from './pestel.dto';
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

  @Get('preSeeds')
  async getPreSeeds() {
    const preSeeds = await this.pestelService.getPreSeeds();
    return preSeeds;
  }

  @Post('preSeeds')
  async insertPreSeeds(
    @Body()
    preSeedDTO: {
      consejoPositvio: string;
      consejoNegativo: string;
      puntaje: number;
      descripcion: string;
      area: string;
    },
  ) {
    const preSeeds = await this.pestelService.insertPreSeed(preSeedDTO);
    return preSeeds;
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
  async insert(@Body() pestelDTO: PestelDto) {
    const pestel = await this.pestelService.create(pestelDTO);
    return pestel;
  }

  @Post(':id/factor')
  async insertRelation(@Param('id') id: string, @Body() factorDTO: FactorDto) {
    const pestel = await this.pestelService.insertFactor(id, factorDTO);
    return pestel;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() pestelDTO: PestelDto) {
    const pestel = await this.pestelService.update(id, pestelDTO);
    return pestel;
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
    @Body() updatedFactor: FactorDto,
  ) {
    const response = await this.pestelService.editFactor(
      id,
      idFactor,
      updatedFactor,
    );
    return response;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const documentId = await this.pestelService.delete(id);
    return {
      _id: documentId,
    };
  }
}
