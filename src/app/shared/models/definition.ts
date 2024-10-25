export class Definition{
  id:number;
  definition: string;
  created_at: string;
  updated_at: string;

  constructor(definition:any){
    this.id = definition.id
    this.definition = definition.definition
    this.created_at = definition.created_at
    this.updated_at = definition.updated_at
  }
}
