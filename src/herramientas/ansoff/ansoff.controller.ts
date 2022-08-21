import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AnsoffService } from './ansoff.service';
import { AnsoffRequest, AnsoffResponse, ProductoRequest } from './ansoff.dto';
import { Ansoff } from './ansoff.schema';

@Controller('ansoff')
export class AnsoffController {
  constructor(private ansoffService: AnsoffService) {}

  @Post('')
  async insert(@Body() ansoffDto: AnsoffRequest): Promise<Ansoff> {
    const ansoff = await this.ansoffService.create(ansoffDto);
    return ansoff;
  }

  @Get(':projectId')
  async find(@Param('projectId') projectId: string): Promise<AnsoffResponse> {
    const ansoff = await this.ansoffService.findByProjectId(projectId);
    return new AnsoffResponse(ansoff);
  }

  @Post(':projectId/products')
  async addProduct(
    @Param('projectId') projectId: string,
    @Body() productRequest: ProductoRequest,
  ): Promise<AnsoffResponse> {
    const ansoff = await this.ansoffService.addProduct(
      projectId,
      productRequest,
    );
    return new AnsoffResponse(ansoff);
  }

  @Put(':projectId/products/:productId')
  async editProduct(
    @Param('projectId') projectId: string,
    @Param('productId') productId: string,
    @Body() productRequest: ProductoRequest,
  ): Promise<AnsoffResponse> {
    const ansoff = await this.ansoffService.editProduct(
      projectId,
      productId,
      productRequest,
    );
    return new AnsoffResponse(ansoff);
  }

  @Delete(':projectId/products/:productId')
  async deleteProduct(
    @Param('projectId') projectId: string,
    @Param('productId') productId: string,
  ) {
    const ansoff = await this.ansoffService.deleteProduct(projectId, productId);
    return new AnsoffResponse(ansoff);
  }
}
