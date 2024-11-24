import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { WriteStream } from 'fs';
import { File } from 'src/file/domain/file/types/file';
import { Stream } from 'stream';

@Injectable()
export class ExternalFileDownloaderService {
    constructor(private readonly httpService: HttpService) {}

    async downloadPicture(url: string, filename: string): Promise<File> {
        const response = await this.httpService.axiosRef<ArrayBuffer>({
            url: url,
            method: 'GET',
            responseType: 'arraybuffer',
        });

        return {
            filedescriptor: {
                name: filename,
                mimeType: response.headers['content-type']
            },
            data: Buffer.from(response.data)
        }
    }
}
