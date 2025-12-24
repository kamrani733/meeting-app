import { z } from "zod";
import {CONTACT_METHODS, SCHEDULE_TIMES, ScheduleTime} from "./constants";

export const MeetingSchema = z.object({
    firstName: z.string().max(250),
    lastName: z.string().max(250),
    email: z.email().max(250),
    contactMethod: z.union(CONTACT_METHODS.map(item => z.literal(item.id))),
    contactValue: z.string().max(250),
    scheduleDate: z.iso.datetime().pipe(z.coerce.date()),
    scheduleTime: z.union(SCHEDULE_TIMES.map(item => z.literal(item.id))),
    purpose: z.string().max(250).optional(),
})

export const emailValidator = z.email().max(250);
export const irPhoneNumValidator = z.string().refine(val => {
    const regex = /^\+989\d{9}$/
    return regex.test(val)
}, {message: "Phone number must start with +989 and be 13 characters long",})