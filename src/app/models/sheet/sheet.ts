import { Group } from "../group/group";
import { Stage } from "../stage/stage";
import { User } from "../user/user";

export class Sheet {
    id!: number;
    title!: string;
    description!: string;
    isGroup!:boolean;
    creator!:User;
    assigned?:Group;
    tasks?:Array<Task>;
    stages?:Array<Stage>;
}
