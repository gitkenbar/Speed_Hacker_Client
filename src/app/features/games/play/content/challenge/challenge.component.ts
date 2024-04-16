import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Challenge } from '../../../../../shared/models/challenge';
import { BehaviorSubject } from 'rxjs';
import anime from 'animejs/lib/anime.es.js';
import { ContentComponent } from '../content.component';

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
  @Output() userInput = document.getElementsByClassName(this.instanceIndex as string)

  challengeInstance = document.getElementsByClassName("grid-container")!
  userResponse!:string;

  constructor(private contentComponent: ContentComponent){}
  ngOnInit(): void{
    this.instanceIndex = this.challengeArray.indexOf(this.instance)
    //this.userInput?.addEventListener("input", this.inputCheck)
    //console.log(this.userInput)
  }

  inputCheck(){
    // How do I select inputs?
    //console.log(this.instance)
    if(this.instance.length == this.form.value[this.instanceIndex].length){
      console.log("input checked")
      this.form.get(`group${this.instanceIndex}`)?.disable()
    }
   }
   //this.form.getRawValue()
   test(){
    this.userResponse = this.form.value[this.instanceIndex]

    this.form.value[this.instanceIndex]
    if(this.instance.length == this.form.value[this.instanceIndex].length){
      this.form.controls[this.instanceIndex]?.disable()
      document.getElementById(`${this.instanceIndex + 1}`)?.focus()
      if(this.form.disabled){
        this.contentComponent.score()
      }
      }
  }
}

