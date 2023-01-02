import { User } from "../user/user";

export class Group {
    id!:number;
    members!:Array<User>;

    constructor(id:number) {
        this.id = id;
    }
}
