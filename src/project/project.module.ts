import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FodaModule } from 'src/herramientas/foda/foda.module';
import { PestelModule } from 'src/herramientas/pestel/pestel.module';
import { ProjectController } from './project.controller';
import { ProjectSchema } from './project.schema';
import { ProjectService } from './project.service';
import { AnsoffModule } from '../herramientas/ansoff/ansoff.module';
import { PorterModule } from '../herramientas/porter/porter.module';
import { MckinseyModule } from '../herramientas/mckinsey/mckinsey.module';
import { OkrModule } from '../herramientas/okr/okr.module';
import { BalancedScorecardModule } from '../herramientas/balancedScorecard/balanceScorecard.module';
import { QuestionnaireModule } from '../herramientas/questionnaire/questionnaire.module';

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
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [],
})
export class ProjectModule {}
