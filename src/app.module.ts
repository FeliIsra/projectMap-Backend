import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { FodaModule } from './FODA/foda.module';
import { PestelModule } from './PESTEL/pestel.module';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    AuthModule,
    FodaModule,
    PestelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
