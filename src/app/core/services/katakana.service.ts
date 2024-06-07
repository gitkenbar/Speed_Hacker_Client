import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KatakanaService {

  // Character Bank
  katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
  latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  nums = '0123456789';
  symbols = '!@#$%^&*()-=[];<>?/'
  mixMatrix = this.katakana + this.latin + this.nums + this.symbols

  // Functions
  katakanaIt(animated: string | undefined, speed: number){
    console.log(animated)
    console.log(speed)


    //this function will pull apart a string
    //replace each piece with a random mixMatrix
    //return the string to it's original state
  }
}
