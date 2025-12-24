import { z } from "zod";

const phoneRegex = /^\+98\s\d{3}\s\d{3}\s\d{4}$/;

export const meetingSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    contactMethod: z.enum(["phone", "email", "whatsapp", "telegram", "facetime"]),
    contactValue: z.string().min(1, "Contact value is required"),
    scheduleDate: z.string().min(1, "Date is required"),
    scheduleTime: z.string().min(1, "Time is required"),
    purpose: z.string().max(250, "Purpose must be 250 characters or less").optional(),
  })
  .refine(
    (data) => {
      if (data.contactMethod === "phone") {
        return phoneRegex.test(data.contactValue);
      }
      if (data.contactMethod === "email") {
        return z.string().email().safeParse(data.contactValue).success;
      }
      return true;
    },
    {
      message: "Phone number must be in format: +98 912 111 1111",
      path: ["contactValue"],
    }
  )
  .refine(
    (data) => {
      if (data.scheduleDate && data.scheduleTime) {
        try {
          const dateStr = data.scheduleDate;
          const timeStr = data.scheduleTime;
          
          // Map schedule time ID to actual time
          const scheduleTimeMap: Record<number, string> = {
            1: "15:00:00",
            2: "16:00:00",
            3: "20:00:00",
            4: "22:00:00",
          };
          
          const scheduleTimeId = parseInt(timeStr);
          const time = scheduleTimeMap[scheduleTimeId];
          
          if (!time) {
            return true; // If time ID is invalid, skip validation
          }
          
          // Combine date and time
          const meetingDateTime = new Date(dateStr + "T" + time);
          
          if (isNaN(meetingDateTime.getTime())) {
            return true; // If date is invalid, skip validation
          }
          
          const now = new Date();
          return meetingDateTime > now;
        } catch (e) {
          return true;
        }
      }
      return true;
    },
    {
      message: "Meeting time must be in the future",
      path: ["scheduleTime"],
    }
  );

export type MeetingFormData = z.infer<typeof meetingSchema>;

