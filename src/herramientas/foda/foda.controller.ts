import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FactorDTO, FodaDTO } from './foda.dto';
import { FodaService } from './foda.service';

@UseGuards(AuthGuard('jwt'))
@Controller('foda')
export class FodaController {
  constructor(private fodaService: FodaService) {}

  @Get('options')
  async getOptions() {
    const options = await this.fodaService.getOptions();
    return options;
  }

  @Get('')
  async getAll() {
    const fodas = await this.fodaService.getAll();
    return fodas;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const foda = await this.fodaService.getOne(id);
    return foda;
  }

  @Post('')
  async insert(@Body() fodaDTO: FodaDTO) {
    const foda = await this.fodaService.create(fodaDTO);
    return foda;
  }

  @Post(':id/factor')
  async insertRelation(@Param('id') id: string, @Body() factorDTO: FactorDTO) {
    const foda = await this.fodaService.insertFactor(id, factorDTO);
    return foda;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() fodaDTO: FodaDTO) {
    const foda = await this.fodaService.update(id, fodaDTO);
    return foda;
  }

  @Put(':id/factor/:idFactor')
  async updateFactor(
    @Param('id') id: string,
    @Param('idFactor') idFactor: string,
    @Body() factorDTO: FactorDTO,
  ) {
    const foda = await this.fodaService.updateFactor(id, idFactor, factorDTO);
    return foda;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const response = await this.fodaService.delete(id);
    return response;
  }

  @Delete(':id/factor/:idFactor')
  async deleteFactor(
    @Param('id') id: string,
    @Param('idFactor') idFactor: string,
  ) {
    const response = await this.fodaService.deleteFactor(id, idFactor);
    return response;
  }
}
