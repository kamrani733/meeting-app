"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useScheduleTimes } from "@/lib/queries";
import { DateTimePickerModal } from "./DateTimePickerModal";

export const DateTimePicker: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const { data: scheduleTimes = [] } = useScheduleTimes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scheduleTime = watch("scheduleTime");
  const scheduleDate = watch("scheduleDate");

  const selectedTimeLabel = scheduleTimes.find(
    (t: { value: string; label: string }) => t.value === scheduleTime
  )?.label || "Select Date & Time";

  const handleSelect = async (date: string, time: string, value: string) => {
    setValue("scheduleDate", date, { shouldValidate: true, shouldDirty: true });
    setValue("scheduleTime", value, { shouldValidate: true, shouldDirty: true });
    await trigger(["scheduleDate", "scheduleTime"]);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-900">
          Date & Time <span className="text-red-500">*</span>
        </label>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={`w-full px-4 py-2 border rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center justify-between ${
            errors.scheduleTime ? "border-red-500" : "border-gray-300"
          }`}
        >
          <span className={scheduleTime ? "text-gray-900" : "text-gray-500"}>
            {selectedTimeLabel}
          </span>
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {errors.scheduleTime && (
          <p className="text-sm text-red-500">{errors.scheduleTime.message as string}</p>
        )}
        <input
          type="hidden"
          {...register("scheduleDate")}
        />
        <input
          type="hidden"
          {...register("scheduleTime", { required: "Date & Time is required" })}
        />
      </div>

      <DateTimePickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelect}
        scheduleTimes={scheduleTimes}
        initialTimeSlot={scheduleTime}
        initialDate={scheduleDate}
      />
    </>
  );
};

