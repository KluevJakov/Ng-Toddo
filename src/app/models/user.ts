import { Role } from "./role";

export class User {
  id!: number;
  token!:string;
  email!:string;
  roles!:Array<Role>;

  constructor(user:any){
    this.id = user.id;
    this.token = user.token;
    this.email = user.email;
    this.roles = user.roles;
  }
}
