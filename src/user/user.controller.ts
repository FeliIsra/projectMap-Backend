import { Controller, Get, Param } from '@nestjs/common';
import { ProjectService } from '../project/project.service';
import { FodaService } from '../herramientas/foda/foda.service';
import { PestelService } from '../herramientas/pestel/pestel.service';
import { AnsoffService } from '../herramientas/ansoff/ansoff.service';
import { UserService } from './user.service';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UserDto } from './user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userId')
  async findById(@Param('userId') userId: string) {
    return this.userService.findById(userId);
  }
}
