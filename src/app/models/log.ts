export class Log {
    id!: number;
    date!: Date;
    message!: string;

    constructor(log:any){
        this.id = log.id;
        this.date = log.date;
        this.message = log.name;
    }
}
