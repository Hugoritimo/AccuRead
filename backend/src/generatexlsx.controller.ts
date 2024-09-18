/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExcelService } from './generatexlsx.service';

@Controller('generate-excel')
export class ExcelController {
    constructor(private readonly excelService: ExcelService) { }

    @Post()
    exportExcel(@Body() body: { data: any }, @Res() res: Response) {
        const excelBuffer = this.excelService.generateExcel(body.data);
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename="report.xlsx"',
        });
        res.send(excelBuffer);
    }
}
