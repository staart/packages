const EMAIL_FROM = process.env.EMAIL_FROM || "";
const EMAIL_HOST = process.env.EMAIL_HOST || "";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";

const transporter = createTransport(
  {
    host: EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_FROM,
      pass: EMAIL_PASSWORD
    }
  },
  {
    from: EMAIL_FROM
  }
);

transporter
  .verify()
  .then(() => success("Email transport works"))
  .catch(() => logError("SMTP", "Unable to verify email transport", 1));

export interface Mail {
  from: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  message: string;
  altText?: string;
  replyTo?: string;
}

/**
 * Send a new email
 */
export const sendMail = async (mail: Mail) => {
  const result = await transporter.sendMail({
    to: mail.to,
    cc: mail.cc,
    bcc: mail.bcc,
    subject: mail.subject,
    text: mail.altText,
    html: mail.message
  });
  success("Sent email", mail.to, mail.subject);
  return result;
};
