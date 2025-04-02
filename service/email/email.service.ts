"use server";

import { config } from "@/config";
import nodemailer from "nodemailer";
import { IEmailParams } from "./params.interface";
import { ThankForContactUsTemplate } from "./templates/thanks-contact-us.template";

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
  const { to } = fields;

  const userEmail = ThankForContactUsTemplate(fields);

  const userMailOptions = {
    from: '"Argus" <contacto@argus.globals.one>',
    to,
    subject: "Prueba",
    html: userEmail,
  };

  const argusMailOptions = {
    from: '"Argus" <contacto@argus.globals.one>',
    to,
    subject: "Prueba",
    html: userEmail,
  };

  try {
    const info = await transporter.sendMail(userMailOptions);
    console.log("Correo enviado", info.response);
  } catch (error) {
    console.log("Error", error);
  }
};
