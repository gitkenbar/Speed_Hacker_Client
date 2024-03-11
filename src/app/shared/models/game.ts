import { User } from "./user";

export class Game{
  id: number;
  title: string;
  content: string[];
  created_at:string;
  user?: User;

  constructor(game:any){
    this.id = game.id || 0;
    this.title = game.title || "";
    this.content = game.content || "";
    this.created_at = game.created_at || ""
    this.user = game.user || null;
  }
}
