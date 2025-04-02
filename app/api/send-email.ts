import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { config } from "@/config";
import { ContactUsTemplate } from "@/service/email/templates/contact-us.template";

const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_IMAP_PORT,
  secure: true,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASSWORD,
  },
} as nodemailer.TransportOptions);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const fields = req.body;

    const template = ContactUsTemplate(fields);
    const mailOptions = {
      from: '"Nombre" <contacto@argus.globals.one>',
      to: "julian.agama@globals.one",
      subject: "Prueba",
      text: "Contenido del correo en texto plano",
      html: template,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Correo enviado:", info.response);
      res.status(200).json({ message: "Correo enviado correctamente" });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      res.status(500).json({ error: "Error al enviar el correo" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
