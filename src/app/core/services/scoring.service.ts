import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Score } from '../../shared/models/score';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {

  multiplier: number = 1;
  score: number = 0

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  scoreIt(userId: number, gameId: number, stringifiedChallenge: string, formValue: string, timeRemaining: number) {
    console.log("Score It Service Works!")
    for(let challenge of stringifiedChallenge){
      let challengeIndex:number = stringifiedChallenge.indexOf(challenge)
      let response = formValue.charAt(challengeIndex)
      if(challenge == response){
        this.score = this.score + this.multiplier
        this.multiplier++
      }else {
        this.multiplier = 1
      }
    }
    let bonus:number = timeRemaining * this.multiplier
    let total: number = this.score + bonus
    console.log(total)

    this.postIt(userId, gameId, total)
  }

  postIt(userId: number, gameId: number, total: number) {
    console.log("Trying to post it")
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
}
