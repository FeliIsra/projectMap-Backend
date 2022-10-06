import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  KeyResult,
  KeyStatus,
  Okr,
  OkrDocument,
  OkrProject,
} from './okr.schema';
import { Model } from 'mongoose';
import {
  GlobalOkrDto,
  KeyResultDto,
  KeyStatusDto,
  OkrDto,
  OkrProjectDto,
} from './okr.dto';
import { ok } from 'assert';

@Injectable()
export class OkrService {
  constructor(
    @InjectModel(OkrProject.name) private okrModel: Model<OkrDocument>,
  ) {}

  async create(okrProjectDto: OkrProjectDto) {
    const okrProject = new this.okrModel(okrProjectDto);
    return okrProject.save();
  }

  async findById(okrProjectId: string) {
    return this.okrModel.findById(okrProjectId).exec();
  }

  async findOkrById(okrProjectId: string, okrId: string) {
    const okrProject: OkrProject = await this.okrModel
      .findById(okrProjectId)
      .exec();

    const okr = okrProject.okrs.find((okr) => okr._id.toString() == okrId);

    return okr;
  }

  async getAllByProjectId(projectId: string) {
    return this.okrModel.find({ projectId: projectId }).exec();
  }

  async findGlobalOkrById(okrProjectId: string, okrId: string) {
    const okrProject: OkrProject = await this.okrModel
      .findById(okrProjectId)
      .exec();

    const okr = okrProject.okrs.find((okr) => okr._id.toString() == okrId);

    const relatedOkrs = okrProject.okrs.filter((okr) => okr.globalOkr == okrId);

    const progress =
      relatedOkrs.map((okr) => okr.progress).reduce((x, y) => x + y) /
      relatedOkrs.length;

    const statusPerMonth: Map<string, number> = new Map();

    relatedOkrs.forEach((okr) =>
      okr.keyResults.forEach((kr) =>
        kr.keyStatus.forEach((ks) => {
          const status = statusPerMonth.get(ks.month);
          if (status) statusPerMonth.set(ks.month, status + ks.value);
          else statusPerMonth.set(ks.month, ks.value);
        }),
      ),
    );

    const keyStatus = [];
    statusPerMonth.forEach((progress, month) =>
      keyStatus.push(new KeyStatusDto(month, progress)),
    );

    return new GlobalOkrDto(
      okrId,
      okr.description,
      keyStatus,
      progress,
      okr.area,
    );
  }

  async addOkr(okrProjectId: string, okrDto: OkrDto) {
    const okrProject: OkrProject = await this.okrModel
      .findById(okrProjectId)
      .exec();

    const okr = new Okr(
      okrDto.description,
      okrDto.globalOkr,
      okrDto.area,
      okrDto.quarter,
    );

    if (okrDto.keyResults) {
      const keyResults = okrDto.keyResults.map((keyResultDto) => {
        const keyStatuses = keyResultDto.keyStatus.map(
          (keyStatusDto) =>
            new KeyStatus(keyStatusDto.month, keyStatusDto.value),
        );
        const keyResult = new KeyResult(
          keyResultDto.description,
          keyResultDto.goal,
          keyResultDto.responsible,
        );
        keyResult.keyStatus = keyStatuses;
        return keyResult;
      });
      okr.keyResults = keyResults;
    }

    okrProject.okrs.push(okr);

    return new this.okrModel(okrProject).save();
  }

  async editOkr(okrProjectId: string, okrId: string, okrDto: OkrDto) {
    const okrProject: OkrProject = await this.okrModel
      .findById(okrProjectId)
      .exec();

    okrProject.okrs.forEach((okr) => {
      if (okr._id.toString() == okrId) {
        okr.area = okrDto.area;
        okr.description = okrDto.description;
      }
    });

    return new this.okrModel(okrProject).save();
  }

  async removeOkr(okrProjectId: string, okrId: string) {
    const okrProject: OkrProject = await this.okrModel
      .findById(okrProjectId)
      .exec();

    okrProject.okrs = okrProject.okrs.filter(
      (okr) => okr._id.toString() != okrId,
    );

    return new this.okrModel(okrProject).save();
  }

  async addKeyResult(
    okrProjectId: string,
    okrId: string,
    keyResultDto: KeyResultDto,
  ) {
    const okrProject: OkrProject = await this.okrModel
      .findById(okrProjectId)
      .exec();

    const okr = okrProject.okrs.find((okr) => okr._id.toString() == okrId);
    if (!okr) throw new HttpException('Okr not found', HttpStatus.NOT_FOUND);

    const keyStatuses = keyResultDto.keyStatus.map(
      (keyStatusDto) => new KeyStatus(keyStatusDto.month, keyStatusDto.value),
    );
    const keyResult = new KeyResult(
      keyResultDto.description,
      keyResultDto.goal,
      keyResultDto.responsible,
    );

    keyResult.keyStatus = keyStatuses;

    okr.keyResults.push(keyResult);

    return new this.okrModel(okrProject).save();
  }

  async editKeyResult(
    okrProjectId: string,
    okrId: string,
    keyResultId: string,
    keyResultDto: KeyResultDto,
  ) {
    const okrProject: OkrProject = await this.okrModel
      .findById(okrProjectId)
      .exec();

    const okr = okrProject.okrs.find((okr) => okr._id.toString() == okrId);
    if (!okr) throw new HttpException('Okr not found', HttpStatus.NOT_FOUND);

    okr.keyResults.forEach((keyResult) => {
      if (keyResult._id.toString() == keyResultId) {
        keyResult.description = keyResultDto.description;
        keyResult.goal = keyResultDto.goal;
        keyResult.responsible = keyResultDto.responsible;
      }
    });

    return new this.okrModel(okrProject).save();
  }

  async removeKeyResult(
    okrProjectId: string,
    okrId: string,
    keyResultId: string,
  ) {
    const okrProject: OkrProject = await this.okrModel
      .findById(okrProjectId)
      .exec();

    const okr = okrProject.okrs.find((okr) => okr._id.toString() == okrId);
    if (!okr) throw new HttpException('Okr not found', HttpStatus.NOT_FOUND);

    okr.keyResults = okr.keyResults.filter(
      (keyResult) => keyResult._id.toString() != keyResultId,
    );

    return new this.okrModel(okrProject).save();
  }

  async addKeyStatus(
    okrProjectId: string,
    okrId: string,
    keyResultId: string,
    keyStatusDto: KeyStatusDto,
  ) {
    const okrProject: OkrProject = await this.okrModel
      .findById(okrProjectId)
      .exec();

    const okr = okrProject.okrs.find((okr) => okr._id.toString() == okrId);
    if (!okr) throw new HttpException('Okr not found', HttpStatus.NOT_FOUND);

    const keyResult = okr.keyResults.find(
      (kr) => kr._id.toString() == keyResultId,
    );

    const keystatus = new KeyStatus(keyStatusDto.month, keyStatusDto.value);
    keyResult.keyStatus.push(keystatus);

    return new this.okrModel(okrProject).save();
  }

  async editKeyStatus(
    okrProjectId: string,
    okrId: string,
    keyResultId: string,
    keyStatusId: string,
    keyStatusDto: KeyStatusDto,
  ) {
    const okrProject: OkrProject = await this.okrModel
      .findById(okrProjectId)
      .exec();

    const okr = okrProject.okrs.find((okr) => okr._id.toString() == okrId);
    if (!okr) throw new HttpException('Okr not found', HttpStatus.NOT_FOUND);
    const keyResult = okr.keyResults.find(
      (kr) => kr._id.toString() == keyResultId,
    );

    keyResult.keyStatus.forEach((keyStatus) => {
      if (keyStatus._id.toString() == keyStatusId) {
        keyStatus.month = keyStatusDto.month;
        keyStatus.value = keyStatusDto.value;
      }
    });

    return new this.okrModel(okrProject).save();
  }

  async removeKeyStatus(
    okrProjectId: string,
    okrId: string,
    keyResultId: string,
    keyStatusId: string,
  ) {
    const okrProject: OkrProject = await this.okrModel
      .findById(okrProjectId)
      .exec();

    const okr = okrProject.okrs.find((okr) => okr._id.toString() == okrId);
    if (!okr) throw new HttpException('Okr not found', HttpStatus.NOT_FOUND);

    const keyResult = okr.keyResults.find(
      (kr) => kr._id.toString() == keyResultId,
    );

    keyResult.keyStatus.filter((ks) => ks._id.toString() != keyStatusId);

    return new this.okrModel(okrProject).save();
  }
}
