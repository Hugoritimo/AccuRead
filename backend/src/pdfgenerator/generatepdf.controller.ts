/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res } from '@nestjs/common';
import { PdfService } from './generatepdf.service';
import { Response } from 'express';

@Controller('pdfgenerator') // Defina a rota base como /pdfgenerator
export class PdfController {
    constructor(private readonly pdfService: PdfService) { }

    @Post('generate')
    async generatePDF(@Body() body: { htmlContent: string }, @Res() res: Response) {
        try {
            const pdfBuffer = await this.pdfService.generatePDF(body.htmlContent);
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="relatorio.pdf"',
            });
            res.send(pdfBuffer);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao gerar PDF' });
        }
    }
}

// Remova a linha a seguir para evitar conflito de exportação
// export { PdfController };
