import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from './user.roles';
import { UpdateUserDto } from './user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userId')
  async findById(@Param('userId') userId: string) {
    return this.userService.findById(userId);
  }

  @Put(':userId/role')
  async updateRole(@Param('userId') userId, @Query('role') role: Roles) {
    return this.userService.updateRole(userId, role);
  }

  @Put(':userId')
  async update(@Param('userId') userId, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(userId, updateUserDto);
  }
}
