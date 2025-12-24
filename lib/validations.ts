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
          
          let meetingDateTime: Date;
          
          if (timeStr.includes("T") || (timeStr.includes(" ") && timeStr.includes(":"))) {
            meetingDateTime = new Date(timeStr);
          } else if (dateStr && timeStr) {
            const timeMatch = timeStr.match(/(\d+)-(\d+)\s*(am|pm)/i);
            if (timeMatch) {
              let startHour = parseInt(timeMatch[1]);
              const period = timeMatch[3].toLowerCase();
              if (period === "pm" && startHour !== 12) startHour += 12;
              if (period === "am" && startHour === 12) startHour = 0;
              
              meetingDateTime = new Date(dateStr);
              meetingDateTime.setHours(startHour, 0, 0, 0);
            } else {
              meetingDateTime = new Date(timeStr);
              if (isNaN(meetingDateTime.getTime())) {
                meetingDateTime = new Date(dateStr);
              }
            }
          } else {
            return true;
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

