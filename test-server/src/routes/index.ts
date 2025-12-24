import { Router } from "express";
import AppDataSource from "../db/data-source";
import {Meeting} from "../db/entities/Meeting";
import {CONTACT_METHODS, ContactMethod, MapScheduleTime, SCHEDULE_TIMES} from "../utils/constants";
import {emailValidator, irPhoneNumValidator, MeetingSchema} from "../utils/validation";

const router = Router();


const getMeetingRepo = () => AppDataSource.getRepository(Meeting);

router.get("/contact-methods", (req, res) => {
    res.status(200).json({ data: CONTACT_METHODS });
});
router.get("/schedule-times", (req, res) => {
    res.status(200).json({ data: SCHEDULE_TIMES });
});
router.get("/meetings/:id", async (req, res) => {
    try {
        const idParam = req.params.id;
        if (Number.isNaN(idParam)) {
            return res.status(400).json({ message: "Invalid meeting ID" });
        }
        const meetingId = Number(idParam);
        const meeting = await getMeetingRepo().findOne({
            where: {
                id: meetingId
            }
        })
        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }
        const data = meeting.toJSON();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve meeting" });
    }

});

router.put("/meetings/:id", async (req, res) => {
    try {
        const validateBody = MeetingSchema.safeParse(req.body);
        if (!validateBody.success) {
            const errorMessages = validateBody.error.issues.map(issue => issue.message);
            return res.status(400).json({ error: validateBody.error.issues, message: errorMessages.join(", ") });
        }
        if (validateBody.data.contactMethod === ContactMethod.email) {
            const validatedEmail = emailValidator.safeParse(validateBody.data.contactValue);
            if (!validatedEmail.success) {
                const errorMessages = validatedEmail.error.issues.map(issue => issue.message);
                return res.status(400).json({ error: validatedEmail.error.issues, message: errorMessages.join(", ") });
            }
        } else {
            const validatedNumber = irPhoneNumValidator.safeParse(validateBody.data.contactValue);
            if (!validatedNumber.success) {
                const errorMessages = validatedNumber.error.issues.map(issue => issue.message);
                return res.status(400).json({ error: validatedNumber.error.issues, message: errorMessages.join(", ") });
            }
        }
        const idParam = req.params.id;
        if (Number.isNaN(idParam)) {
            return res.status(400).json({ message: "Invalid meeting ID" });
        }
        const meetingId = Number(idParam);
        const meeting = await getMeetingRepo().findOne({
            where: {
                id: meetingId
            }
        })
        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }
        const now = new Date();
        const scheduleDate = validateBody.data.scheduleDate;
        const scheduleTimeId = validateBody.data.scheduleTime;
        const scheduleTime = MapScheduleTime[scheduleTimeId]
        const date = new Date(scheduleDate.getFullYear(), scheduleDate.getMonth(), scheduleDate.getDate(), ...scheduleTime.split(":").map(Number));
        if (date < now) {
            return res.status(400).json({ message: "Scheduled date and time must be in the future" });
        }
        const meetingRepo = getMeetingRepo()
        const updatedMeeting = meetingRepo.merge(meeting, validateBody.data);
        await meetingRepo.save(updatedMeeting);
        const data = updatedMeeting.toJSON()
        res.status(200).json({ data  });
    } catch (error) {
        res.status(500).json({ message: "Failed to create meeting" });
    }
});
router.post("/meetings", async (req, res) => {
    try {
        const validateBody = MeetingSchema.safeParse(req.body);
        if (!validateBody.success) {
            const errorMessages = validateBody.error.issues.map(issue => issue.message);
            return res.status(400).json({ error: validateBody.error.issues, message: errorMessages.join(", ") });
        }
        if (validateBody.data.contactMethod === ContactMethod.email) {
            const validatedEmail = emailValidator.safeParse(validateBody.data.contactValue);
            if (!validatedEmail.success) {
                const errorMessages = validatedEmail.error.issues.map(issue => issue.message);
                return res.status(400).json({ error: validatedEmail.error.issues, message: errorMessages.join(", ") });
            }
        } else {
            const validatedNumber = irPhoneNumValidator.safeParse(validateBody.data.contactValue);
            if (!validatedNumber.success) {
                const errorMessages = validatedNumber.error.issues.map(issue => issue.message);
                return res.status(400).json({ error: validatedNumber.error.issues, message: errorMessages.join(", ") });
            }
        }
        const now = new Date();
        const scheduleDate = validateBody.data.scheduleDate;
        const scheduleTimeId = validateBody.data.scheduleTime;
        const scheduleTime = MapScheduleTime[scheduleTimeId]
        const date = new Date(scheduleDate.getFullYear(), scheduleDate.getMonth(), scheduleDate.getDate(), ...scheduleTime.split(":").map(Number));
        if (date < now) {
            return res.status(400).json({ message: "Scheduled date and time must be in the future" });
        }
        const meetingRepo = getMeetingRepo()
        const meeting = meetingRepo.create(validateBody.data);
        await meetingRepo.save(meeting);
        const data = meeting.toJSON()
        res.status(200).json({ data  });
    } catch (error) {
        console.log("error => ", error)
        res.status(500).json({ message: "Failed to create meeting" });
    }
});


export default router;