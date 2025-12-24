import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {CONTACT_METHODS, SCHEDULE_TIMES} from "../../utils/constants";


@Entity("meetings")
export class Meeting {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    firstName!: string;
    @Column()
    lastName!: string;
    @Column()
    email!: string;
    @Column({
        type: "smallint",
    })
    scheduleTime!: number;
    @Column({
        type: "datetime",
    })
    scheduleDate!: Date;
    @Column({
        type: "smallint",
    })
    contactMethod!: number;
    @Column()
    contactValue!: string;
    @Column({
        type: "text",
        default: "",
    })
    purpose?: string = "";

    @CreateDateColumn({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt!: Date;
    @UpdateDateColumn({
        type: "datetime",
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt?: Date | null = null;

    toJSON() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            scheduleTime: SCHEDULE_TIMES.find(item => item.id === this.scheduleTime),
            scheduleDate: this.scheduleDate,
            contactMethod: CONTACT_METHODS.find(item => item.id === this.contactMethod),
            contactValue: this.contactValue,
            purpose: this.purpose || "",
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}