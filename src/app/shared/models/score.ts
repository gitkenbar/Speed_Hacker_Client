export class Score{
  id: number;
  score: number;
  user_id: number;
  game_id: number;

  constructor(score: any) {
    this.id = score.id || 0;
    this.score = score.score || 0;
    this.user_id = score.user_id || 0;
    this.game_id = score.game_id || 0;
  }
}
