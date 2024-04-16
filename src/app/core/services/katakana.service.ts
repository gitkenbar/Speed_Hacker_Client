import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KatakanaService {
  katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
  latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  nums = '0123456789';
  symbols = '!@#$%^&*()-=[];<>?/'
  mixMatrix = this.katakana + this.latin + this.nums + this.symbols

  katakanaIt(animated: string | undefined){
    console.log(animated)


    //this function will pull apart a string
    //replace each piece with a random mixMatrix
    //return the string to it's original state
  }
}
