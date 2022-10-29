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
import { ConsultantDto, ConsultoraDto } from './consultora.dto';
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

  @Put(':consultoraId/admin')
  async assignAdmin(
    @Param('consultoraId') consultoraId: string,
    @Body() consultant: ConsultantDto,
  ) {
    return this.consultoraService.assignNewAdmin(
      consultoraId,
      consultant.email,
    );
  }

  @Put(':consultoraId/admin')
  async removeAdmin(
    @Param('consultoraId') consultoraId: string,
    @Body() consultant: ConsultantDto,
  ) {
    return this.consultoraService.removeAdmin(consultoraId);
  }

  @Put(':consultoraId/consultants')
  async assignConsultor(
    @Param('consultoraId') consultoraId: string,
    @Body() consultant: ConsultantDto,
  ) {
    return this.consultoraService.assignNewConsultor(
      consultoraId,
      consultant.email,
    );
  }

  @Delete(':consultoraId/consultants')
  async removeConsultor(
    @Param('consultoraId') consultoraId: string,
    @Body() consultant: ConsultantDto,
  ) {
    return this.consultoraService.removeConsultor(
      consultoraId,
      consultant.email,
    );
  }

  @Delete(':consultoraId')
  async delete(@Param('consultoraId') consultoraId: string) {
    return this.consultoraService.delete(consultoraId);
  }
}
