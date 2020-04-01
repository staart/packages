import { config } from "dotenv";
import { createTransport, Transporter } from "nodemailer";
import { success, logError } from "@staart/errors";
import aws from "aws-sdk";

config();

const EMAIL_FROM = process.env.EMAIL_FROM || "";
const EMAIL_HOST = process.env.EMAIL_HOST || "";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";

const SES_SECRET = process.env.SES_SECRET || "";
const SES_ACCESS = process.env.SES_ACCESS || "";
const SES_EMAIL = process.env.SES_EMAIL || "";
const SES_REGION = process.env.SES_REGION || "";

let transporter: Transporter | undefined = undefined;

/**
 * Sets up a Nodemailer transporter to send emails
 */
export const setupTransporter = () => {
  if (SES_ACCESS && SES_SECRET) {
    transporter = createTransport({
      SES: new aws.SES({
        apiVersion: "2010-12-01",
        accessKeyId: SES_ACCESS,
        secretAccessKey: SES_SECRET,
        region: SES_REGION
      })
    });
  } else {
    transporter = createTransport({
      host: EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_FROM,
        pass: EMAIL_PASSWORD
      }
    });
  }
};

/**
 * Sends a test email
 */
export const sendTestEmail = () => {
  if (transporter)
    transporter
      .verify()
      .then(() => success("Email transport works"))
      .catch(() => logError("Email", "Unable to verify email transport", 1));
};

export interface Mail {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  message: string;
  altText?: string;
  replyTo?: string;
}

/**
 * Send an email
 * @param mail - Mail object to send
 */
export const sendMail = async (mail: Mail) => {
  if (!transporter)
    return logError("Email", "Setup transporter before sending an email", 1);
  const result = await transporter.sendMail({
    from: EMAIL_FROM || SES_EMAIL,
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
