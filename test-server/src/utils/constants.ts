export const PORT = 3000;

export enum ScheduleTime {
    first = 1,
    second = 2,
    third = 3,
    fourth = 4,
}

export const SCHEDULE_TIMES = [
    {id: ScheduleTime.first, label: "03:00 pm - 04:00 pm"},
    {id: ScheduleTime.second, label: "04:00 pm - 05:00 pm"},
    {id: ScheduleTime.third, label: "08:00 pm - 09:00 pm"},
    {id: ScheduleTime.fourth, label: "10:00 pm - 11:00 pm"},
]

export enum ContactMethod {
    phone = 1,
    whatsapp = 2,
    telegram = 3,
    email = 4,
    facetime = 5,
    imo = 6,
}
export const CONTACT_METHODS = [
    {id: ContactMethod.phone, label: "Phone (Call & SMS)", icon: `http://localhost:${PORT}/images/phone.png`},
    {id: ContactMethod.whatsapp, label: "WhatsApp", icon: `http://localhost:${PORT}/images/whatsapp.png`},
    {id: ContactMethod.telegram, label: "Telegram", icon: `http://localhost:${PORT}/images/telegram.png`},
    {id: ContactMethod.email, label: "Email", icon: `http://localhost:${PORT}/images/email.png`},
    {id: ContactMethod.facetime, label: "Face time", icon: `http://localhost:${PORT}/images/facetime.png`},
    {id: ContactMethod.imo, label: "IMO", icon: `http://localhost:${PORT}/images/imo.png`},
]

export const MapScheduleTime = {
    [ScheduleTime.first]: "15:00:00",
    [ScheduleTime.second]: "16:00:00",
    [ScheduleTime.third]: "20:00:00",
    [ScheduleTime.fourth]: "22:00:00",
}