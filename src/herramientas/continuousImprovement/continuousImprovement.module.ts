import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from '../../project/project.schema';
import { FodaModule } from '../foda/foda.module';
import { PestelModule } from '../pestel/pestel.module';
import { AnsoffModule } from '../ansoff/ansoff.module';
import { PorterModule } from '../porter/porter.module';
import { MckinseyModule } from '../mckinsey/mckinsey.module';
import { OkrModule } from '../okr/okr.module';
import { BalancedScorecardModule } from '../balancedScorecard/balanceScorecard.module';
import { QuestionnaireModule } from '../continuosImprovement/questionnaire.module';
import { ContinuousImprovementController } from './continuousImprovement.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    FodaModule,
    PestelModule,
    AnsoffModule,
    PorterModule,
    MckinseyModule,
    OkrModule,
    BalancedScorecardModule,
    QuestionnaireModule,
  ],
  providers: [],
  controllers: [ContinuousImprovementController],
  exports: [],
})
export class ContinuousImprovementModule {}
