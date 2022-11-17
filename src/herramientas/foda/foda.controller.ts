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
import { FactorDto, FodaDto } from './foda.dto';
import { FodaService } from './foda.service';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('foda')
@Controller('foda')
export class FodaController {
  constructor(private fodaService: FodaService) {}

  @Get('options')
  async getOptions() {
    const options = await this.fodaService.getOptions();
    return options;
  }

  @Get('preSeeds')
  async getPreSeeds() {
    const preSeeds = await this.fodaService.getPreSeeds();
    return preSeeds;
  }

  @Post('preSeeds')
  async insertPreSeeds(
    @Body() preSeedDTO: { consejo: string; descripcion: string; area: string },
  ) {
    const preSeeds = await this.fodaService.insertPreSeed(preSeedDTO);
    return preSeeds;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const foda = await this.fodaService.getOne(id);
    return foda;
  }

  @Post('')
  async insert(@Body() fodaDTO: FodaDto) {
    const foda = await this.fodaService.create(fodaDTO);
    return foda;
  }

  @Post(':id/factor')
  async insertRelation(@Param('id') id: string, @Body() factorDTO: FactorDto) {
    const foda = await this.fodaService.insertFactor(id, factorDTO);
    return foda;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() fodaDTO: FodaDto) {
    const foda = await this.fodaService.update(id, fodaDTO);
    return foda;
  }

  @Put(':id/factor/:idFactor')
  async updateFactor(
    @Param('id') id: string,
    @Param('idFactor') idFactor: string,
    @Body() factorDTO: FactorDto,
  ) {
    const foda = await this.fodaService.updateFactor(id, idFactor, factorDTO);
    return foda;
  }

  @Delete(':id/factor/:idFactor')
  async deleteFactor(
    @Param('id') id: string,
    @Param('idFactor') idFactor: string,
  ) {
    const response = await this.fodaService.deleteFactor(id, idFactor);
    return response;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const documentId = await this.fodaService.delete(id);
    return {
      _id: documentId,
    };
  }
}
