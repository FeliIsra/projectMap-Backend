import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BalancedScorecard,
  BalancedScoreCardDocument,
  Checkpoint,
  Initiative,
  Objective,
} from './balancedScorecard.schema';
import { Model } from 'mongoose';
import {
  BalancedScorecardDto,
  CheckpointDto,
  InitiativeDto,
  ObjectiveDto,
} from './balancedScorecard.dto';
import { Area } from './perspectives';
import { Trend } from './trends';

@Injectable()
export class BalancedScorecardService {
  constructor(
    @InjectModel(BalancedScorecard.name)
    private balancedScorecardModel: Model<BalancedScoreCardDocument>,
  ) {}

  async create(balancedScorecardDto: BalancedScorecardDto) {
    const balancedScorecard = new this.balancedScorecardModel(
      balancedScorecardDto,
    );
    return balancedScorecard.save();
  }

  async delete(balancedScorecardId: string) {
    return this.balancedScorecardModel.findByIdAndDelete(balancedScorecardId);
  }

  async findById(balancedScorecardId: string) {
    return this.balancedScorecardModel.findById(balancedScorecardId);
  }

  async findObjectiveById(balancedScorecardId: string, objectiveId: string) {
    const balancedScorecard = await this.balancedScorecardModel.findById(
      balancedScorecardId,
    );

    return balancedScorecard.objectives.find(
      (objective) => objective._id.toString() == objectiveId,
    );
  }

  async getAllByProjectId(projectId: string) {
    return this.balancedScorecardModel.find({ projectId: projectId }).exec();
  }

  async edit(
    balancedScorecardId: string,
    balancedScorecardDto: BalancedScorecardDto,
  ) {
    const balancedScorecard: BalancedScorecard =
      await this.balancedScorecardModel.findById(balancedScorecardId);
    balancedScorecard.titulo = balancedScorecardDto.titulo;
    return new this.balancedScorecardModel(balancedScorecard).save();
  }

  async addInitiative(
    balancedScorecardId: string,
    initiativeDto: InitiativeDto,
  ) {
    const balancedScorecard: BalancedScorecard =
      await this.balancedScorecardModel.findById(balancedScorecardId);
    const initiative = new Initiative(
      initiativeDto.area as Area,
      initiativeDto.description,
    );
    balancedScorecard.initiatives.push(initiative);
    return new this.balancedScorecardModel(balancedScorecard).save();
  }

  async removeInitiative(balancedScorecardId: string, initiativeId: string) {
    const balancedScorecard: BalancedScorecard =
      await this.balancedScorecardModel.findById(balancedScorecardId);
    balancedScorecard.initiatives = balancedScorecard.initiatives.filter(
      (initiative) => initiative._id.toString() != initiativeId,
    );

    return new this.balancedScorecardModel(balancedScorecard).save();
  }

  async editInitiative(
    balancedScorecardId: string,
    initiativeId: string,
    initiativeDto: InitiativeDto,
  ) {
    const balancedScorecard: BalancedScorecard =
      await this.balancedScorecardModel.findById(balancedScorecardId);
    balancedScorecard.initiatives.forEach((initiative) => {
      if (initiative._id.toString() == initiativeId) {
        initiative.area = initiativeDto.area as Area;
        initiative.description = initiativeDto.description;
      }
    });
    return new this.balancedScorecardModel(balancedScorecard).save();
  }

  async addObjective(balancedScorecardId: string, objectiveDto: ObjectiveDto) {
    const balancedScorecard: BalancedScorecard =
      await this.balancedScorecardModel.findById(balancedScorecardId);
    const objective = new Objective(
      objectiveDto.action,
      objectiveDto.measure,
      objectiveDto.target,
      objectiveDto.area as Area,
      objectiveDto.responsible,
    );

    balancedScorecard.objectives.push(objective);
    return new this.balancedScorecardModel(balancedScorecard).save();
  }

  async editObjective(
    balancedScorecardId: string,
    objectiveId: string,
    objectiveDto: ObjectiveDto,
  ) {
    const balancedScorecard: BalancedScorecard =
      await this.balancedScorecardModel.findById(balancedScorecardId);

    balancedScorecard.objectives.forEach((objective) => {
      if (objective._id.toString() == objectiveId) {
        objective.action = objectiveDto.action;
        objective.measure = objectiveDto.measure;
        objective.target = objectiveDto.target;
        objective.area = objectiveDto.area as Area;
      }
    });

    return new this.balancedScorecardModel(balancedScorecard).save();
  }

  async removeObjective(balancedScorecardId: string, objectiveId: string) {
    const balancedScorecard: BalancedScorecard =
      await this.balancedScorecardModel.findById(balancedScorecardId);

    balancedScorecard.objectives = balancedScorecard.objectives.filter(
      (objective) => objective._id.toString() != objectiveId,
    );

    return new this.balancedScorecardModel(balancedScorecard).save();
  }

  async addCheckpoint(
    balancedScorecardId: string,
    objectiveId: string,
    checkpointDto: CheckpointDto,
  ) {
    const balancedScorecard: BalancedScorecard =
      await this.balancedScorecardModel.findById(balancedScorecardId);

    const objective = balancedScorecard.objectives.find(
      (o) => o._id.toString() == objectiveId,
    );
    const checkpoint = new Checkpoint(
      checkpointDto.month,
      checkpointDto.target,
      checkpointDto.actual,
    );

    objective.checkpoints.push(checkpoint);
    return new this.balancedScorecardModel(balancedScorecard).save();
  }

  async editCheckpoint(
    balancedScorecardId: string,
    objectiveId: string,
    checkpointId: string,
    checkpointDto: CheckpointDto,
  ) {
    const balancedScorecard: BalancedScorecard =
      await this.balancedScorecardModel.findById(balancedScorecardId);

    const objective = balancedScorecard.objectives.find(
      (o) => o._id.toString() == objectiveId,
    );

    objective.checkpoints.forEach((checkpoint) => {
      if (checkpoint._id.toString() == checkpointId) {
        checkpoint.actual = checkpointDto.actual;
        checkpoint.month = checkpointDto.month;
        checkpoint.target = checkpointDto.target;
      }
    });

    return new this.balancedScorecardModel(balancedScorecard).save();
  }

  async removeCheckpoint(
    balancedScorecardId: string,
    objectiveId: string,
    checkpointId: string,
  ) {
    const balancedScorecard: BalancedScorecard =
      await this.balancedScorecardModel.findById(balancedScorecardId);

    const objective = balancedScorecard.objectives.find(
      (o) => o._id.toString() == objectiveId,
    );

    objective.checkpoints = objective.checkpoints.filter(
      (c) => c._id.toString() != checkpointId,
    );
    return new this.balancedScorecardModel(balancedScorecard).save();
  }

  async getOptions() {
    return {
      trend: Object.values(Trend),
      area: Object.values(Area),
    };
  }
}
