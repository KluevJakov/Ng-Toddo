export class Stage {
    id!: number;
    name!: string;

    constructor(stage:any){
        this.id = stage.id;
        this.name = stage.name;
    }
}
