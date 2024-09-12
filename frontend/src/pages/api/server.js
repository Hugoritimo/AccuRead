const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();

app.use(express.json());

app.post('/generate-pdf', async (req, res) => {
  const { htmlContent } = req.body;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    res.type('application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao gerar PDF');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
