import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Challenge } from '../../../../../shared/models/challenge';
import { BehaviorSubject } from 'rxjs';
import { ContentComponent } from '../content.component';
import { KatakanaService } from '../../../../../core/services/katakana.service';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.scss'
})
export class ChallengeComponent implements OnInit{
  @Input() challenge!: Challenge;
  @Input() form!: FormGroup;
  @Input() instance!: string;
  @Input() instanceResponse!: BehaviorSubject<string>;
  @Input() challengeArray!: string[]
  instanceIndex!:any;
  challengeName!:any;
  @Output() userInput = document.getElementsByClassName(this.instanceIndex as string)

  challengeInstance!: HTMLElement| null;

  userResponse = signal('');

  constructor(
    private contentComponent: ContentComponent,
    private katakanaService: KatakanaService){}

  ngOnInit(): void{
    this.instanceIndex = this.challengeArray.indexOf(this.instance)
    this.challengeName = `challenge-${this.instanceIndex}`
    this.challengeInstance = document.getElementById(this.challengeName)
    //this.userInput?.addEventListener("input", this.inputCheck)
    //console.log(this.userInput)
  }

  inputCheck(){
    if(this.instance.length == this.form.value[this.instanceIndex].length){
      this.form.get(`group${this.instanceIndex}`)?.disable()
    }
   }
   //this.form.getRawValue()
   test(){
    // We want userResponse to instead be a string of random katanakana that is the same length
    this.userResponse.update( current => {
        let inputLength = this.form.value[this.instanceIndex].length
        //return this.form.value[this.instanceIndex]
        if( inputLength > current.length){

          let newSymbol = this.katakanaService.getKatakana()
          let modifiedInput = current + newSymbol
          console.log(modifiedInput)
          return modifiedInput
        } else {
          let backspace = current.substring(inputLength, -1)
          return backspace
        }

      }



    )

    //this.form.value[this.instanceIndex]

    this.form.value[this.instanceIndex]
    if(this.instance.length == this.form.value[this.instanceIndex].length){
      this.form.controls[this.instanceIndex]?.disable()
      document.getElementById(`${this.instanceIndex + 1}`)?.focus()


      if(this.form.disabled){
        this.contentComponent.score()
      }
      }
  }

  setCharAt(str:string, i:number, char:string){
    return str.substring(0, i) + char + str.substring(i+1)
  }
}
