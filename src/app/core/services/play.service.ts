import { Injectable } from '@angular/core';
import { Challenge } from '../../shared/models/challenge';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  constructor() { }

  inputChecker(input: string, content: string) {
    if(content == input){
      console.log("You Win!")
    }else{
      console.log("You Lose!")
    }
  }

}
