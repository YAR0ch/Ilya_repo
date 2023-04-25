import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('files')
export class FileshandlerController {
  @Get(':filename')
  async serveFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'files', filename);
    const file = fs.createReadStream(filePath);

    file.pipe(res);
  }
}
