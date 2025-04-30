import type { IEmailParams } from "../params.interface"

export const UserInformationTemplate = (fields: IEmailParams): string => {
  const { company, lastname, name, text, to } = fields
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Información de Contacto | Argus</title>
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"></div>
  </head>
  <body
    style='background-color:rgb(243,244,246);font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";padding-top:40px;padding-bottom:40px'>
    <!--$-->
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="margin-left:auto;margin-right:auto;background-color:rgb(255,255,255);border-radius:8px;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 1px 2px 0 rgb(0,0,0,0.05);overflow:hidden;max-width:600px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="background-color:rgb(255,144,10);padding-top:32px;padding-bottom:32px;padding-left:24px;padding-right:24px;text-align:center">
              <tbody>
                <tr>
                  <td>
                    <h1
                      style="font-size:32px;font-weight:700;color:rgb(255,255,255);margin:0px">
                      Argus
                    </h1>
                    <p
                      style="color:rgb(255,255,255);font-size:16px;margin-top:8px;margin-bottom:0px;line-height:24px">
                      Información de Contacto Recibida
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="padding-left:24px;padding-right:24px;padding-top:32px;padding-bottom:32px">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="font-size:16px;color:rgb(55,65,81);margin-bottom:24px;line-height:24px;margin-top:16px">
                      Se ha recibido la siguiente información de contacto:
                    </p>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="border-width:1px;border-color:rgb(229,231,235);border-radius:8px;overflow:hidden">
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="border-bottom-width:1px;border-color:rgb(229,231,235)">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td
                                    data-id="__react-email-column"
                                    style="padding-top:12px;padding-bottom:12px;padding-left:16px;padding-right:16px;background-color:rgb(249,250,251);width:150px;font-weight:700;font-size:14px;color:rgb(55,65,81)">
                                    Nombre
                                  </td>
                                  <td
                                    data-id="__react-email-column"
                                    style="padding-top:12px;padding-bottom:12px;padding-left:16px;padding-right:16px;font-size:14px;color:rgb(31,41,55)">
                                    ${name}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="border-bottom-width:1px;border-color:rgb(229,231,235)">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td
                                    data-id="__react-email-column"
                                    style="padding-top:12px;padding-bottom:12px;padding-left:16px;padding-right:16px;background-color:rgb(249,250,251);width:150px;font-weight:700;font-size:14px;color:rgb(55,65,81)">
                                    Apellido
                                  </td>
                                  <td
                                    data-id="__react-email-column"
                                    style="padding-top:12px;padding-bottom:12px;padding-left:16px;padding-right:16px;font-size:14px;color:rgb(31,41,55)">
                                    ${lastname}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="border-bottom-width:1px;border-color:rgb(229,231,235)">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td
                                    data-id="__react-email-column"
                                    style="padding-top:12px;padding-bottom:12px;padding-left:16px;padding-right:16px;background-color:rgb(249,250,251);width:150px;font-weight:700;font-size:14px;color:rgb(55,65,81)">
                                    Email
                                  </td>
                                  <td
                                    data-id="__react-email-column"
                                    style="padding-top:12px;padding-bottom:12px;padding-left:16px;padding-right:16px;font-size:14px;color:rgb(31,41,55)">
                                    ${to}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="border-bottom-width:1px;border-color:rgb(229,231,235)">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td
                                    data-id="__react-email-column"
                                    style="padding-top:12px;padding-bottom:12px;padding-left:16px;padding-right:16px;background-color:rgb(249,250,251);width:150px;font-weight:700;font-size:14px;color:rgb(55,65,81)">
                                    Empresa
                                  </td>
                                  <td
                                    data-id="__react-email-column"
                                    style="padding-top:12px;padding-bottom:12px;padding-left:16px;padding-right:16px;font-size:14px;color:rgb(31,41,55)">
                                    ${company}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td
                                    data-id="__react-email-column"
                                    style="padding-top:12px;padding-bottom:12px;padding-left:16px;padding-right:16px;background-color:rgb(249,250,251);width:150px;font-weight:700;font-size:14px;color:rgb(55,65,81)">
                                    Mensaje
                                  </td>
                                  <td
                                    data-id="__react-email-column"
                                    style="padding-top:12px;padding-bottom:12px;padding-left:16px;padding-right:16px;font-size:14px;color:rgb(31,41,55)">
                                    ${text}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="background-color:rgb(249,250,251);padding-left:24px;padding-right:24px;padding-top:24px;padding-bottom:24px;text-align:center;border-top-width:1px;border-color:rgb(229,231,235)">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="font-size:12px;color:rgb(107,114,128);margin:0px;line-height:24px;margin-bottom:16px;margin-top:16px">
                      ©
                      <!-- -->2025<!-- -->
                      Argus. Todos los derechos reservados.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--7--><!--/$-->
  </body>
</html>`
}
