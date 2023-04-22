import { Department } from "./department";
import { Role } from "./role";

export class User {
  id!: number;
  email!:string;
  surname!:string;
  name!:string;
  patronymic!:string;
  address!:string;
  jobPosition!:string;
  department!:Department;
  regDate!:Date;
  roles!:Array<Role>;
  token!:string;

  constructor(user:any){
    this.id = user.id;
    this.email = user.email;
    this.surname = user.surname;
    this.name = user.name;
    this.patronymic = user.patronymic;
    this.address = user.address;
    this.jobPosition = user.jobPosition;
    this.department = user.department;
    this.regDate = user.regDate;
    this.roles = user.roles;
    this.token = user.token;
  }
}
