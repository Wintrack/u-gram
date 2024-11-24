import { ApiProperty } from "@nestjs/swagger";

export class DownloadFromUrl {
    @ApiProperty()
    readonly url: string;
}