import { User } from "./user";

export class Game{
  id: number;
  name: string;
  content_id: number;
  created_at:string;
  updated_at:string;
  user_id: number;

  constructor(game:any){
    this.id = game.id || 0;
    this.name = game.name || "";
    this.content_id = game.content_id || "";
    this.created_at = game.created_at || ""
    this.updated_at = game.updated_at || ""
    this.user_id = game.user_id || null;
  }
}
