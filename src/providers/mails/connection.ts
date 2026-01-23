import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SESTransport from "nodemailer/lib/ses-transport";


const sender = process.env.APP_EMAIL;

export class Nodemailer {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = this.initializeTransporter()
  }

  private initializeTransporter() {
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use true for port 465, false for port 587
      auth: {
        user: "consuelo.hagenes@ethereal.email",
        pass: "G5dFkRS5UD7EJEPj2U",
      },
    });
  }

  previewMessage (info: SESTransport.SentMessageInfo){
    return nodemailer.getTestMessageUrl(info)
  }

  async sendEmail(mailOptions: Mail.Options){

    try {
      const info = await this.transporter.sendMail({
        from: sender,
        ...mailOptions
      })
      return this.previewMessage(info)
    } catch (error) {
      console.error('Error sending email', error)
      throw error
    }
  }
}
