import { User } from "./user";

export class Group {
    id!:number;
    members!:Array<User>;

    constructor(id:number) {
        this.id = id;
    }
}
