import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Challenge } from '../../../../../shared/models/challenge';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.scss'
})
export class ChallengeComponent implements OnInit, OnChanges{
  @Input() challenge!: Challenge;
  @Input() form!: FormGroup;
  @Input() instance!: string;
  @Input() instanceResponse!: string;
  @Input() challengeArray!: string[]
  instanceIndex!:number;

  ngOnInit(){
  }

  ngOnChanges(changes: SimpleChanges): void{
    this.instanceIndex = this.challengeArray.indexOf(this.instance)
    //console.log("change detected")
    //console.log(this.instance.length)
    //console.log(this.instanceIndex)
    //console.log(this.form.value[this.instanceIndex].length)
    //console.log(this.form.value[+this.instanceIndex])
    if(this.form.controls[this.instanceIndex]?.value.maxLength){
      console.log("input checked, disabled")
      this.form.controls[this.instanceIndex]?.disable()
    }
  }

  inputCheck(){
    if(this.instance.length == this.form.value[this.instanceIndex].length){
      console.log("input checked")
      this.form.get(`group${this.instanceIndex}`)?.disable()
    }
   }
   //this.form.getRawValue()
   test(){
    if(this.instance.length == this.form.value[this.instanceIndex].length){
      console.log("input checked, disabled")
      this.form.controls[this.instanceIndex]?.disable()
    }
   }
}

