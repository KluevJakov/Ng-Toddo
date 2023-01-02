export class User {
  id!: number;
  token!:string;
  email!:string;
  role!:string;

  constructor(user:any){
    this.id = user.id;
    this.token = user.token;
    this.email = user.email;
    this.role = user.role;
  }
}
