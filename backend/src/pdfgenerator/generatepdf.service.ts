/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
    async generatePDF(htmlContent: string): Promise<Buffer> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const pdfBuffer = await page.pdf({ format: 'A4' });
        await browser.close();
        return pdfBuffer;
    }
}
