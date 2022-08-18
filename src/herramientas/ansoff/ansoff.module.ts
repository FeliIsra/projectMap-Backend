import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Ansoff, AnsoffSchema} from "./ansoff.schema";
import {AnsoffService} from "./ansoff.service";
import {AnsoffController} from "./ansoff.controller";

@Module({
    imports: [MongooseModule.forFeature([{name: Ansoff.name, schema: AnsoffSchema}])],
    providers: [AnsoffService],
    controllers: [AnsoffController],
    exports: [AnsoffService],
})
export class AnsoffModule {
}
