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
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { OkrService } from './okr.service';
import { KeyResultDto, KeyStatusDto, OkrDto, OkrProjectDto } from './okr.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('okr-projects')
@ApiTags('okr')
@UseGuards(AuthGuard('jwt'))
export class OkrController {
  constructor(private okrService: OkrService) {}
  @Post('')
  async insert(@Body() okrProjectDto: OkrProjectDto) {
    const okrProject = await this.okrService.create(okrProjectDto);
    return okrProject;
  }

  @Get(':okrProjectId')
  async findById(@Param('okrProjectId') okrProjectId: string) {
    const okrProject = await this.okrService.findById(okrProjectId);
    return okrProject;
  }

  @Get(':okrProjectId/okrs/:okrId/global')
  async findGlobalOkr(
    @Param('okrProjectId') okrProjectId: string,
    @Param('okrId') okrId: string,
  ) {
    const okr = await this.okrService.findGlobalOkrById(okrProjectId, okrId);
    return okr;
  }

  @Get(':okrProjectId/okrs/:okrId')
  async findOkrById(
    @Param('okrProjectId') okrProjectId: string,
    @Param('okrId') okrId: string,
  ) {
    const okr = await this.okrService.findOkrById(okrProjectId, okrId);
    return okr;
  }

  @Post(':okrProjectId/okrs')
  async addOkr(
    @Param('okrProjectId') okrProjectId: string,
    @Body() okrDto: OkrDto,
  ) {
    const okrProject = await this.okrService.addOkr(okrProjectId, okrDto);
    return okrProject;
  }

  @Put(':okrProjectId/okrs/:okrId')
  async editOkr(
    @Param('okrProjectId') okrProjectId: string,
    @Param('okrId') okrId: string,
    @Body() okrDto: OkrDto,
  ) {
    const okrProject = await this.okrService.editOkr(
      okrProjectId,
      okrId,
      okrDto,
    );
    return okrProject;
  }

  @Delete(':okrProjectId/okrs/:okrId')
  async removeOkr(
    @Param('okrProjectId') okrProjectId: string,
    @Param('okrId') okrId: string,
  ) {
    const okrProject = await this.okrService.removeOkr(okrProjectId, okrId);
    return okrProject;
  }

  @Post(':okrProjectId/okrs/:okrId')
  async addKeyResult(
    @Param('okrProjectId') okrProjectId: string,
    @Param('okrId') okrId: string,
    @Body() keyResultDto: KeyResultDto,
  ) {
    const okrProject = await this.okrService.addKeyResult(
      okrProjectId,
      okrId,
      keyResultDto,
    );
    return okrProject;
  }

  @Put(':okrProjectId/okrs/:okrId/key-results/:keyResultId')
  async editKeyResult(
    @Param('okrProjectId') okrProjectId: string,
    @Param('okrId') okrId: string,
    @Param('keyResultId') keyResultId: string,
    @Body() keyResultDto: KeyResultDto,
  ) {
    const okrProject = await this.okrService.editKeyResult(
      okrProjectId,
      okrId,
      keyResultId,
      keyResultDto,
    );
    return okrProject;
  }

  @Delete(':okrProjectId/okrs/:okrId/key-results/:keyResultId')
  async removeKeyResult(
    @Param('okrProjectId') okrProjectId: string,
    @Param('okrId') okrId: string,
    @Param('keyResultId') keyResultId: string,
  ) {
    const okrProject = await this.okrService.removeKeyResult(
      okrProjectId,
      okrId,
      keyResultId,
    );
    return okrProject;
  }

  @Post(':okrProjectId/okrs/:okrId/key-results/:keyResultId/key-status')
  async addKeyStatus(
    @Param('okrProjectId') okrProjectId: string,
    @Param('okrId') okrId: string,
    @Param('keyResultId') keyResultId: string,
    @Body() keyStatusDto: KeyStatusDto,
  ) {
    const okrProject = await this.okrService.addKeyStatus(
      okrProjectId,
      okrId,
      keyResultId,
      keyStatusDto,
    );
    return okrProject;
  }

  @Put(
    ':okrProjectId/okrs/:okrId/key-results/:keyResultId/key-status/:keyStatusId',
  )
  async editKeyStatus(
    @Param('okrProjectId') okrProjectId: string,
    @Param('okrId') okrId: string,
    @Param('keyResultId') keyResultId: string,
    @Param('keyStatusId') keyStatusId: string,
    @Body() keyStatusDto: KeyStatusDto,
  ) {
    const okrProject = await this.okrService.editKeyStatus(
      okrProjectId,
      okrId,
      keyResultId,
      keyStatusId,
      keyStatusDto,
    );
    return okrProject;
  }

  @Delete(
    ':okrProjectId/okrs/:okrId/key-results/:keyResultId/key-status/:keyStatusId',
  )
  async removeKeyStatus(
    @Param('okrProjectId') okrProjectId: string,
    @Param('okrId') okrId: string,
    @Param('keyResultId') keyResultId: string,
    @Param('keyStatusId') keyStatusId: string,
  ) {
    const okrProject = await this.okrService.removeKeyStatus(
      okrProjectId,
      okrId,
      keyResultId,
      keyStatusId,
    );
    return okrProject;
  }
}
