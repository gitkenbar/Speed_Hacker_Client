export class User{
  id: number;
  username: string;
  password_digest: string;

  constructor(user: any){
    this.id = user.id || 0;
    this.username = user.username || "";
    this.password_digest = user.password_digest || "";
  }
}
