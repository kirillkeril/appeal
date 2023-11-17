import { Module } from '@nestjs/common';
import { AppealService } from './appeal.service';
import { AppealController } from './appeal.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Appeal, AppealSchema} from "./entities/appeal.entity";

@Module({
  imports: [MongooseModule.forFeature([{name: Appeal.name, schema: AppealSchema}])],
  controllers: [AppealController],
  providers: [AppealService],
})
export class AppealModule {}
