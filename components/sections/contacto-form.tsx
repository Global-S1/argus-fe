"use client";

import { sendMail } from "@/service/email/email.service";
import { IEmailParams } from "@/service/email/params.interface";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { LoaderDots } from "../ui/loaders/loader-dots";

interface Props {
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
      success: string;
    };
  };
}

export const ContactoForm = ({ content }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  const { handleSubmit, register, formState } = useForm<IEmailParams>();

  const onSubmit = async (value: IEmailParams) => {
    setIsLoading(true);
    sendMail(value)
      .then(() => {
        setIsSend(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col space-y-4 rounded-xl border bg-white dark:bg-gray-800 p-6 shadow-lg"
    >
      {isSend && (
        <div className="absolute left-0 top-0 w-full h-full bg-[#ffffffbb] flex flex-col items-center justify-center">
          <Checkmark />
          <p className="text-sm font-medium text-gray-700">
            {content.contact.success}
          </p>
        </div>
      )}
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
        {isLoading ? (
          <div className="flex items-center justify-center">
            <LoaderDots scale={0.6} />
          </div>
        ) : (
          <Button
            className={`w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-md hover:shadow-lg ${
              !formState.isValid && "opacity-80"
            }`}
            disabled={!formState.isValid}
          >
            {content.contact.form.submit}
          </Button>
        )}
      </div>
    </form>
  );
};

const Checkmark = () => {
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <svg
      viewBox="0 0 50 50"
      width="50"
      height="50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M10 25 L20 35 L40 15"
        fill="transparent"
        stroke="#ff900a"
        strokeWidth="4"
        strokeLinecap="round"
        initial="hidden"
        animate="visible"
        variants={pathVariants}
      />
    </svg>
  );
};
