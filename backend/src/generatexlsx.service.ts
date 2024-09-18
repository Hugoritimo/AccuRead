/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelService {
    generateExcel(data: any): Buffer {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
        return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    }
}
