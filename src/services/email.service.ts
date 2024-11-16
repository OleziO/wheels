import emailjs from '@emailjs/browser'

interface IAuctionMessage {
  reply_to: string
  name: string
  id: string
  [k: string]: string
}

class EmailService {
  async sendEmail (message: IAuctionMessage) {
    return emailjs
      .send(
        import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        message,
        {
          publicKey: import.meta.env.VITE_EMAIL_API_KEY
        }
      )
  }
}

export const emailService = new EmailService()
