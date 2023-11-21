import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type AppealDocument = HydratedDocument<Appeal>;

@Schema()
export class Appeal {
    @Prop()
    author: string;

    @Prop()
    title: string;

    @Prop({required: true})
    body: string;

    @Prop({required: false})
    tags: [string];
}

export const AppealSchema = SchemaFactory.createForClass(Appeal);
