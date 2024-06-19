import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KatakanaService {

  // Character Bank
  katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
  latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  nums = '0123456789';
  symbols = '!@#$%^&*()-=[];<>?/'
  charMix = this.katakana + this.latin + this.nums + this.symbols

  // Functions
  katakanaIt(animated: string){
    let newString: string = ''
    //this function will pull apart a string
    for(let katakana of animated) {
      let text = this.charMix.charAt(Math.floor(Math.random() * this.charMix.length))
      //replace each piece with a random charMix
      newString += text
    }
    return newString
  }

  getKatakana(){
    // This returns a random character from the charMix
    return this.charMix.charAt(Math.floor(Math.random() * this.charMix.length))
  }

  animationObs(data:any):Observable<string>{
    const observable = new Observable<string>((subscriber) => {

    })

    return observable
  }

  katakanaRain(){
    // this function will create a canvas

    // then it will measure the width and set a size

    // then it will loop over the

  }
}
