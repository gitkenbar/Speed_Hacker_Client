export class User{
  id: number;
  username: string;
  password: string;

  constructor(user: any){
    this.id = user.id || 0;
    this.username = user.username || "";
    this.password = user.password || "";
  }
}
