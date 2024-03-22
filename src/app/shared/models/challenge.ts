export class Challenge{
  id: number;
  challenge: string;
  created_at: string;
  updated_at: string;

  constructor(challenge: any){
    this.id = challenge.id
    this.challenge = challenge.challenge
    this.created_at = challenge.create_at
    this.updated_at = challenge.updated_at
  }
}
