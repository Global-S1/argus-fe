import { publicInstance } from "@/lib/axios";
import { ISendQuestionParam } from "./params.interface";
import { ISendQuestionResponse } from "./response.interface";
import { IHttpData } from "@/components/interfaces/http.interface";

export const IAService = () => {
  const sendQuestion = async (fields: ISendQuestionParam) => {
    const response = publicInstance.post<IHttpData<ISendQuestionResponse>>(
      "/create-chat",
      fields
    );

    return response;
  };
  return { sendQuestion };
};
