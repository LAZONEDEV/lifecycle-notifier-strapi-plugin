import { MailOptions } from "../types";
import { getEmailService } from "./getStrapiService";

type TemplateData = {
  subject: string;
  html: string;
};

export const sendEmail = async (
  mailOptions: MailOptions,
  template: TemplateData,
  data: unknown
) => {
  try {
    const emailService = getEmailService();

    return await emailService.sendTemplatedEmail(mailOptions, template, data);
  
  } catch (error) {
    console.error("Could not send email with error: ", error)
  }
 };
