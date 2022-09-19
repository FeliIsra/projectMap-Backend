import { Consultora } from './consultora.schema';
import { Project } from '../project/project.schema';
import { ApiProperty } from '@nestjs/swagger';

export class ConsultoraDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  admin: string;

  @ApiProperty()
  projects: string[];
}
