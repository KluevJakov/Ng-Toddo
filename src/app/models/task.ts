import { Stage } from "./stage";
import { User } from "./user";

export class Task {
    id!: number;
    regNumber!: number;
    isIncident!: boolean;
    eventDescription!: string;
    eventWhat!: string;
    eventHow!: string;
    eventWhy!: string;
    eventDamageComponents!: string;
    eventDamageBusiness!: string;
    eventIndentVulnerability!: string;
    beginDate!: Date;
    detectionDate!: Date;
    reportDate!: Date;
    isEventEnd!: boolean;
    eventDuration!: string;
    reporter!: User;
    performer!: User;
    stage!: Stage;

    constructor(task:any){
        this.id = task.id;
        this.regNumber = task.regNumber;
        this.isIncident = task.isIncident;
        this.eventDescription = task.eventDescription;
        this.eventWhat = task.eventWhat;
        this.eventHow = task.eventHow;
        this.eventWhy = task.eventWhy;
        this.eventDamageComponents = task.eventDamageComponents;
        this.eventDamageBusiness = task.eventDamageBusiness;
        this.eventIndentVulnerability = task.eventIndentVulnerability;
        this.beginDate = task.beginDate;
        this.detectionDate = task.detectionDate;
        this.reportDate = task.reportDate;
        this.isEventEnd = task.isEventEnd;
        this.eventDuration = task.eventDuration;
        this.reporter = task.reporter;
        this.performer = task.performer;
        this.stage = task.stage;
    }
}
