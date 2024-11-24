import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsUUID } from "class-validator";

export class ResizePictureDto {
    @ApiProperty()
    @IsUUID()
    readonly id: string;

    @ApiProperty()
    @IsNumber()
    readonly width: number;

    @ApiProperty()
    @IsNumber()
    readonly height: number;
}