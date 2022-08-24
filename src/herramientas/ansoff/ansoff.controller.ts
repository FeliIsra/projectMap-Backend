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
import { AnsoffService } from './ansoff.service';
import { Ansoff } from './ansoff.schema';
import { AnsoffDto, AnsoffProductDto } from './ansoff.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('ansoff')
export class AnsoffController {
  constructor(private ansoffService: AnsoffService) {}

  @Post('')
  async insert(@Body() ansoffDto: AnsoffDto): Promise<Ansoff> {
    const ansoff = await this.ansoffService.create(ansoffDto);
    return ansoff;
  }

  @Get('options')
  async getOptions() {
    return await this.ansoffService.getOptions();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.ansoffService.findById(id);
  }

  @Post(':id/products')
  async addProduct(
    @Param('id') id: string,
    @Body() productRequest: AnsoffProductDto,
  ) {
    return await this.ansoffService.addProduct(id, productRequest);
  }

  @Put(':id/products/:productId')
  async editProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
    @Body() productRequest: AnsoffProductDto,
  ) {
    return await this.ansoffService.editProduct(id, productId, productRequest);
  }

  @Delete(':projectId/products/:productId')
  async deleteProduct(
    @Param('projectId') projectId: string,
    @Param('productId') productId: string,
  ) {
    return await this.ansoffService.deleteProduct(projectId, productId);
  }
}
