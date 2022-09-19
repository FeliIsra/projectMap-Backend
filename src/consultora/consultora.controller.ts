import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ConsultoraDto } from './consultora.dto';
import { ConsultoraService } from './consultora.service';
import { use } from 'passport';

@ApiTags('consultoras')
@Controller('consultoras')
export class ConsultoraController {
  constructor(private consultoraService: ConsultoraService) {}

  @Post('')
  async create(@Body() consultoraDto: ConsultoraDto) {
    return this.consultoraService.create(consultoraDto);
  }

  @Get(':consultoraId')
  async findById(@Param('consultoraId') consultoraId: string) {
    return this.consultoraService.findById(consultoraId);
  }

  @Put(':consultoraId')
  async update(
    @Param('consultoraId') consultoraId: string,
    @Body() consultoraDto: ConsultoraDto,
  ) {
    return this.consultoraService.update(consultoraId, consultoraDto);
  }

  @Put(':consultoraId/assign/:userId')
  async assignConsultor(
    @Param('consultoraId') consultoraId: string,
    @Param('userId') userId: string,
  ) {
    return this.consultoraService.assignNewConsultor(consultoraId, userId);
  }

  @Delete(':consultoraId/assign/:userId')
  async removeConsultor(
    @Param('consultoraId') consultoraId: string,
    @Param('userId') userId: string,
  ) {
    return this.consultoraService.removeConsultor(consultoraId, userId);
  }

  @Delete(':consultoraId')
  async delete(@Param('consultoraId') consultoraId: string) {
    return this.consultoraService.delete(consultoraId);
  }
}
