import { IEmailParams } from "../params.interface";

export const ThankForContactUsTemplate = (fields: IEmailParams): string => {
  const { lastname, name } = fields;
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #16a7e1;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }

        .header img {
            width: 50px;
            margin-bottom: 10px;
        }

        .content {
            padding: 20px;
        }

        .content h1 {
            color: #ff900a;
        }

        .content p {
            line-height: 1.5;
        }

        .footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
            font-size: 0.8em;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="icono.png" alt="Argus Logo">
            <h1>Bienvenido a Argus</h1>
        </div>
        <div class="content">
            <h1>Hola, ${name} ${lastname}</h1>
            <p>¡Gracias por unirte a Argus! Nos entusiasma tenerte a bordo. Esperamos que encuentres nuestros servicios útiles y valiosos.</p>
            <p>En breve un miembro de nuestro equipo se estará poniendo en contacto contigo.</p>
        </div>
        <div class="footer">
            © ${new Date().getFullYear} Argus. Todos los derechos reservados.
        </div>
    </div>
</body>
</html>`;
};
