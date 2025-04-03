"use server";

import { config } from "@/config";
import nodemailer from "nodemailer";
import { IEmailParams } from "./params.interface";
import { ThankForContactUsTemplate } from "./templates/thanks-contact-us.template";
import { UserInformationTemplate } from "./templates/user-information.template";

const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_SMTP_PORT,
  secure: true,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASSWORD,
  },
} as nodemailer.TransportOptions);

export const sendMail = async (fields: IEmailParams) => {
  const { to, company, name } = fields;

  const userEmail = ThankForContactUsTemplate(fields);
  const infoEmail = UserInformationTemplate(fields);

  const userMailOptions = {
    from: `"Argus" <${config.EMAIL_USER}>`,
    to,
    subject: `🎉 Argus | Estimado ${name}`,
    html: userEmail,
  };

  const infoMailOptions = {
    from: `"${company} <${to}>"`,
    to: config.EMAIL_USER,
    subject: `🔔 ${company} requiere atención`,
    html: infoEmail,
  };

  try {
    await transporter.sendMail(userMailOptions);
  } catch (error) {
    console.error("Error", error);
  }

  try {
    await transporter.sendMail(infoMailOptions);
  } catch (error) {
    console.error("Error", error);
  }
};
