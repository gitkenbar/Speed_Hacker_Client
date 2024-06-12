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
  katakanaIt(animated: string){
    let newString: string = ''
    //this function will pull apart a string
    for(let katakana of animated) {
      let text = this.mixMatrix.charAt(Math.floor(Math.random() * this.mixMatrix.length))
      //replace each piece with a random mixMatrix
      newString += text
    }


    //return the string to it's original state
    return newString
  }

  getKatakana(){
    let newKatakana = this.mixMatrix.charAt(Math.floor(Math.random() * this.mixMatrix.length))
    return newKatakana
  }
  katakanaRain(){
    // this function will create a canvas

    // then it will measure the width and set a size

    // then it will loop over the

  }
}
