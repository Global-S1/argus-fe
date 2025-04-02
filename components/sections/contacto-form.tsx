import { IEmailParams } from "@/service/email/params.interface";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { sendMail } from "@/service/email/email.service";

interface Props {
  form: UseFormReturn<IEmailParams, any, IEmailParams>;
  content: {
    contact: {
      form: {
        firstName: string;
        lastName: string;
        email: string;
        company: string;
        message: string;
        submit: string;
        placeholder: {
          firstName: string;
          lastName: string;
          email: string;
          company: string;
          message: string;
        };
      };
    };
  };
}

export const ContactoForm = ({ form, content }: Props) => {
  const { register, handleSubmit, formState } = form;

  const onSubmit = async (value: IEmailParams) => {
    sendMail(value);
    // try {
    //   const response = await fetch("/api/send-email", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(value),
    //   });

    //   console.log(response);

    //   if (response.ok) {
    //     console.log("Correo enviado correctamente");
    //   } else {
    //     console.error("Error al enviar el correo");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 rounded-xl border bg-white dark:bg-gray-800 p-6 shadow-lg"
    >
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="first-name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
            >
              {content.contact.form.firstName}
            </label>
            <input
              {...register("name", { required: true })}
              id="first-name"
              className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={content.contact.form.placeholder.firstName}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="last-name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
            >
              {content.contact.form.lastName}
            </label>
            <input
              {...register("lastname", { required: true })}
              id="last-name"
              className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={content.contact.form.placeholder.lastName}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
          >
            {content.contact.form.email}
          </label>
          <input
            {...register("to", { required: true })}
            id="email"
            type="email"
            className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={content.contact.form.placeholder.email}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="company"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
          >
            {content.contact.form.company}
          </label>
          <input
            {...register("company", { required: true })}
            id="company"
            className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={content.contact.form.placeholder.company}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
          >
            {content.contact.form.message}
          </label>
          <textarea
            {...register("text", { required: true })}
            id="message"
            className="flex min-h-[120px] w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={content.contact.form.placeholder.message}
          />
        </div>
        <Button
          className={`w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg ${
            !formState.isValid && "opacity-80"
          }`}
          disabled={!formState.isValid}
        >
          {content.contact.form.submit}
        </Button>
      </div>
    </form>
  );
};
