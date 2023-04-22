import { Stage } from "./stage";
import { User } from "./user";

export class Sheet {
    id!: number;
    title!: string;
    description!: string;
    isGroup!:boolean;
    creator!:User;
    tasks?:Array<Task>;
    stages?:Array<Stage>;
}
