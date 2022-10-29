export abstract class EmailNotification {
  bodyText: string;
  subject: string;

  async send(destination: string) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: destination,
      from: 'projectmap.utn@gmail.com',
      subject: this.subject,
      text: this.bodyText,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((reason) => console.log(`Failed to send email. Reason ${reason}`));
  }
}
