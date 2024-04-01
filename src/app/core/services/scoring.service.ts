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
    //console.log(stringifiedChallenge)
    //console.log(formValue)
    //console.log(timeRemaining)
    for(let challenge of stringifiedChallenge){
      let challengeIndex:number = stringifiedChallenge.indexOf(challenge)
      let response = formValue.charAt(challengeIndex)
      if(challenge == response){
        this.score = this.score + this.multiplier
        this.multiplier++
        console.log(this.multiplier)
      }else {
        this.multiplier = 0
      }
      //console.log("Challenge: " + challenge)
      //console.log("Challenge Index: " + challengeIndex)
      //console.log("Form Value: " + formValue.charAt(challengeIndex))
    }
    let bonus:number = timeRemaining * this.multiplier
    console.log(this.score)
    let total: number = this.score + bonus
    console.log(total)


    return this.http.post<any>(`${environment.apiUrl}/scores/`, total)
  }
}
