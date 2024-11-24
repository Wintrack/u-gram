import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FileService } from 'src/file/domain/file/file.service';
import { File } from 'src/file/domain/file/types/file';
import { FileDescriptor } from 'src/file/domain/file/types/filedescriptor';
import { DownloadFromUrl } from 'src/file/dto/download-from-url.dto';
import { ResizePictureDto } from 'src/file/dto/resize-picture.dto';

@ApiTags('File')
@Controller('picture')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @ApiOperation({ description: 'Upload a file' })
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        picture: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('picture'))
  async upload(
    @UploadedFile(
      new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({ maxSize: 5000000 }),
            new FileTypeValidator({ fileType: '.(jpeg|jpg|png)' })
          ]
        })
    )
    uploadedFile: Express.Multer.File,
  ): Promise<FileDescriptor> {
    const file: File = {
      filedescriptor: {
        name: uploadedFile.originalname,
        mimeType: uploadedFile.mimetype,
      },
      data: uploadedFile.buffer,
    };

    return await this.fileService.upload(file);
  }

  @ApiOperation({ description: 'Resize a file' })
  @Post('resize-picture')
  async resizePicture(@Body() dto: ResizePictureDto) {
    await this.fileService.resizePicture(dto); 
  }

  @ApiOperation({ description: 'Download a file from an url' })
  @Post('download-from-url')
  async downloadFromUrl(
    @Body() downloadFromUrl: DownloadFromUrl
  ) {
    return await this.fileService.uploadFromUrl(downloadFromUrl.url, 'test');
  }

  @ApiOperation({ description: 'Download a file' })
  @Get('download/:id')
  async download(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.fileService.download(id);

    res.set({
      'Content-Type': file.filedescriptor.mimeType,
      'Content-Disposition': `attachment; filename="${file.filedescriptor.name}"`,
    });
    return new StreamableFile(file.data);
  }
}
