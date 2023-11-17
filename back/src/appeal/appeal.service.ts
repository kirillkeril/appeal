import {Injectable, NotFoundException, NotImplementedException} from '@nestjs/common';
import {CreateAppealDto} from './dto/create-appeal.dto';
import {UpdateAppealDto} from './dto/update-appeal.dto';
import {Appeal} from "./entities/appeal.entity";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class AppealService {
    constructor(@InjectModel(Appeal.name) private appealRepository: Model<Appeal>) {
    }

    async create(createAppealDto: CreateAppealDto): Promise<Appeal> {
        const appeal = await this.appealRepository.create(createAppealDto);
        return await appeal.save();
    }

    async findAll(): Promise<Appeal[]> {
        const appeals = await this.appealRepository.find();
        return appeals;
    }

    async findOne(id: string): Promise<Appeal> {
        const appeal = await this.appealRepository.findById(id);
        if (!appeal) throw new NotFoundException();
        return appeal;
    }

    async update(id: string, updateAppealDto: UpdateAppealDto): Promise<Appeal> {
        const appeal = await this.appealRepository.findById(id);
        if (appeal) throw new NotFoundException();
        const props = Object.keys(updateAppealDto);
        props.map(p => {
            appeal[p] = updateAppealDto[p] ?? appeal[p];
        });
        return appeal;
    }

    async handle(id: string) {
        // TODO Сделать обработку через ML модель
        throw new NotImplementedException();
    }

    async remove(id: string) {
        await this.appealRepository.findByIdAndRemove(id);
    }
}
