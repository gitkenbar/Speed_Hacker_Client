export class ScoreCard{
  highestMultiplier: number;
  correctKeystrokes: number;
  possibleKeystrokes: number;
  timeRemaining: number;
  totalScore: number;
  constructor(
    multiplier: number,
    correct: number,
    possible: number,
    time: number,
    score: number
  ){
    this.highestMultiplier = multiplier
    this.correctKeystrokes = correct
    this.possibleKeystrokes = possible
    this.timeRemaining = time
    this.totalScore = score
  }
}
