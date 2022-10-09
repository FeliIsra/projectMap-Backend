import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { FodaModule } from './herramientas/foda/foda.module';
import { PestelModule } from './herramientas/pestel/pestel.module';
import { AnsoffModule } from './herramientas/ansoff/ansoff.module';
import { ProjectModule } from './project/project.module';
import { PorterModule } from './herramientas/porter/porter.module';
import { MckinseyModule } from './herramientas/mckinsey/mckinsey.module';
import { ConsultoraModule } from './consultora/consultora.module';
import { BalancedScorecardModule } from './herramientas/balancedScorecard/balanceScorecard.module';
import { StickyNoteModule } from './sticky-notes/stickyNote.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    ProjectModule,
    UserModule,
    ConsultoraModule,
    AuthModule,
    FodaModule,
    PestelModule,
    AnsoffModule,
    PorterModule,
    MckinseyModule,
    BalancedScorecardModule,
    StickyNoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
