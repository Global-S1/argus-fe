"use server";

import { config } from "@/config";
import nodemailer from "nodemailer";
import { IEmailParams } from "./params.interface";
import { ContactUsTemplate } from "./templates/contact-us.template";

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
  const template = ContactUsTemplate(fields);

  const mailOptions = {
    from: '"Nombre" <contacto@argus.globals.one>',
    to: "julian.agama@globals.one",
    subject: "Prueba",
    text: "Contenido del correo en texto plano",
    // html: template,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado", info.response);
  } catch (error) {
    console.log("Error", error);
  }
};
