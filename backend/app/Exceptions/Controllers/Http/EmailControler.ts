import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import nodemailer from 'nodemailer'
import Env from '@ioc:Adonis/Core/Env'

export default class EmailController {
  public async send({ request, response }: HttpContextContract) {
    const { formData } = request.only(['formData'])

    const transporter = nodemailer.createTransport({
      host: Env.get('EMAIL_HOST'),
      port: Env.get('EMAIL_PORT'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: Env.get('EMAIL_USER'),
        pass: Env.get('EMAIL_PASS'),
      },
    })

    const mailOptions = {
      from: Env.get('EMAIL_USER'),
      to: formData.emails.join(','),
      subject: 'Relatório Diário de Obra',
      text: JSON.stringify(formData, null, 2), // enviar os dados do formulário como texto
    }

    try {
      await transporter.sendMail(mailOptions)
      return response.status(200).send({ message: 'Email enviado com sucesso!' })
    } catch (error) {
      console.error(error)
      return response.status(500).send({ message: 'Erro ao enviar email' })
    }
  }
}
