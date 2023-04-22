export class Department {
    id!: number;
    name!:string;
  
    constructor(department:any){
      this.id = department.id;
      this.name = department.name;
    }
  }
  