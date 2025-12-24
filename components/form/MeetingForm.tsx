"use client";

import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { meetingSchema } from "@/lib/validations";
import { ContactMethodField } from "./ContactMethodField";
import { DateTimePicker } from "./DateTimePicker";
import { Button } from "@/components/ui/Button";
import type { MeetingFormData } from "@/lib/validations";

interface MeetingFormProps {
  onSubmit: (data: MeetingFormData) => void | Promise<void>;
  defaultValues?: Partial<MeetingFormData>;
  isLoading?: boolean;
}

export const MeetingForm: React.FC<MeetingFormProps> = ({
  onSubmit,
  defaultValues,
  isLoading = false,
}) => {
  const methods = useForm<MeetingFormData>({
    resolver: zodResolver(meetingSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactMethod: "phone",
      contactValue: "",
      scheduleDate: "",
      scheduleTime: "",
      purpose: "",
      ...defaultValues,
    },
  });

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isValid, isDirty },
    setFocus,
  } = methods;

  useEffect(() => {
    if (defaultValues) {
      reset({
        firstName: defaultValues.firstName || "",
        lastName: defaultValues.lastName || "",
        email: defaultValues.email || "",
        contactMethod: defaultValues.contactMethod || "phone",
        contactValue: defaultValues.contactValue || "",
        scheduleDate: defaultValues.scheduleDate || "",
        scheduleTime: defaultValues.scheduleTime || "",
        purpose: defaultValues.purpose || "",
      });
    }
  }, [defaultValues, reset]);

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");
  const contactMethod = watch("contactMethod");
  const contactValue = watch("contactValue");
  const scheduleDate = watch("scheduleDate");
  const scheduleTime = watch("scheduleTime");

  const getTitle = () => {
    if (firstName && lastName) {
      return `Meeting with ${firstName} ${lastName}`;
    }
    if (firstName) {
      return `Meeting with ${firstName}`;
    }
    return "Schedule a Meeting";
  };

  const onError = (errors: Record<string, any>) => {
    const firstError = Object.keys(errors)[0];
    if (firstError) {
      setFocus(firstError as keyof MeetingFormData);
    }
  };

  const hasRequiredFields = 
    firstName?.trim() && 
    lastName?.trim() && 
    email?.trim() && 
    contactMethod &&
    contactValue?.trim() && 
    scheduleDate && 
    scheduleTime;
  
  const isFormValid = hasRequiredFields && isValid;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {getTitle()}
          </h1>
          <p className="text-lg font-medium text-gray-900 mb-1">
            Enter your details to confirm your meeting time.
          </p>
          <p className="text-sm text-gray-600">
            We'll notify the agent right away.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("firstName")}
              placeholder="Enter your First name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("lastName")}
              placeholder="Enter your last name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <ContactMethodField />

          <DateTimePicker />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Purpose of Meeting (max - 250 chars)
            </label>
            <textarea
              {...register("purpose")}
              placeholder="Enter your purpose"
              rows={4}
              maxLength={250}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 resize-y ${
                errors.purpose ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.purpose && (
              <p className="text-sm text-red-500">{errors.purpose.message}</p>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading || !isFormValid} 
          variant={isFormValid ? "purple" : "primary"}
          className="w-full"
        >
          {isLoading ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </FormProvider>
  );
};

