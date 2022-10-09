import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SituacionDelMercado } from './herramientas/ansoff/situacionDelMercado';
import { SituacionDelProducto } from './herramientas/ansoff/situacionDelProducto';
import { Exito } from './herramientas/ansoff/exito';
import { Tool } from './herramientas/tools';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('tools')
  getTools() {
    return {
      tool: Object.values(Tool),
    };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
