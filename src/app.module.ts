import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';

import {MongooseModule} from '@nestjs/mongoose';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import * as dotenv from 'dotenv';
import {FodaModule} from './FODA/foda.module';
import {PestelModule} from './PESTEL/pestel.module';
import {AnsoffModule} from "./ANSOFF/ansoff.module";
import {ProjectModule} from './project/project.module';

dotenv.config();

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URI),
        UserModule,
        AuthModule,
        FodaModule,
        PestelModule,
        AnsoffModule,
        ProjectModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
