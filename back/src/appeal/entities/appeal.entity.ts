import * as mongoose from "mongoose";
import {Prop} from "@nestjs/mongoose";

export class Appeal {
    @Prop({required: true})
    author: string;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    body: string;
}

export const AppealSchema = new mongoose.Schema(Appeal);
