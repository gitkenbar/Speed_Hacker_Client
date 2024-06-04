import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Score } from '../../shared/models/score';
import { Router } from '@angular/router';
import { ScoreboardComponent } from '../../features/games/scoreboard/scoreboard.component';
import { ScoreCard } from '../../shared/models/scorecard';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {
  scoreCard!: ScoreCard;
  score: number = 0
  userScore!: number;
  highestMultiplier!: number;
  correctKeystrokes: number = 0;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  scoreIt(userId: number, gameId: number, stringifiedChallenge: string, formValue: string, timeRemaining: number) {
    // SCORECARD VARIABLES
    let multiplier = 1
    let highestMultiplier = 1
    let correctKeystrokes = 0

    for(let challenge of stringifiedChallenge){
      // This takes each character from the user input and compares it to the target
      let challengeIndex:number = stringifiedChallenge.indexOf(challenge)
      let response = formValue.charAt(challengeIndex)
      if(challenge == response){
        // If the character matches, add to the score, and upgrade the multiplier
        this.score = this.score + multiplier
        correctKeystrokes++
        multiplier++
        if(multiplier > highestMultiplier){
          // This updates the highest multiplier for the scorecard
          highestMultiplier++
        }
      }else {
        //Resets multiplier if it's incorrect
        multiplier = 1
      }
    }
    let bonus: number = timeRemaining * multiplier
    let total: number = this.score + bonus

    // Create the scorecard
    this.scoreCard = new ScoreCard(highestMultiplier, correctKeystrokes, stringifiedChallenge.length, timeRemaining, total);

    // Posts the score on the score board
    this.postIt(userId, gameId, total)
    this.userScore = total
    this.score = 0
  }

  postIt(userId: number, gameId: number, total: number) {
    let newScore: any = {game_id: gameId, user_id: userId, score: total}

    return this.http.post<any>(`${environment.apiUrl}/scores/`, newScore).subscribe({
      next: (res:any) =>{
        this.router.navigate([`/scores/${gameId}`])
      },
      error: (error:any) => {
        console.log("error", error)
        //this.isError = true
      }
  })
  }

  getScorecard(): ScoreCard{
    return this.scoreCard
  }
}
