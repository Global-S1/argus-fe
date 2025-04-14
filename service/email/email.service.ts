import { config } from "@/config";
import { emailInstance } from "@/lib/axios";
import { IEmailAPIParams, IEmailParams } from "./params.interface";
import { IEmailSuccessResponse } from "./response.interface";
import { ThankForContactUsTemplate } from "./templates/thanks-contact-us.template";
import { UserInformationTemplate } from "./templates/user-information.template";

export const sendMail = async (fields: IEmailParams) => {
  const { to, name } = fields;
  const userEmail = ThankForContactUsTemplate(fields);
  const infoEmail = UserInformationTemplate(fields);

  try {
    const response = await emailInstance.post<
      IEmailSuccessResponse,
      IEmailAPIParams
    >("/send-email", {
      to,
      subject: `🎉 ${config.PROJECT_NAME} | Estimado ${name}`,
      userInfo: userEmail,
      argusInfo: infoEmail,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
