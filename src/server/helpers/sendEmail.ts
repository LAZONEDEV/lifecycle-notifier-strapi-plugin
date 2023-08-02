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
  const emailService = getEmailService();

  return emailService.sendTemplatedEmail(mailOptions, template, data);
};
