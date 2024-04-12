import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {

  multiplier: number = 1;
  score: number = 0

  constructor(private http: HttpClient) { }

  scoreIt(stringifiedChallenge: string, formValue: string, timeRemaining: number) {
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

    this.postIt(total)
  }

  postIt(score: number) {
    console.log("Trying to post it")
    return this.http.post<any>(`${environment.apiUrl}/scores/`, {score})
  }
}
