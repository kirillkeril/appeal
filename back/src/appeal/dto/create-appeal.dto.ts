import {ApiProperty} from "@nestjs/swagger";

export class CreateAppealDto {
    @ApiProperty()
    author: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    body: string;
}
