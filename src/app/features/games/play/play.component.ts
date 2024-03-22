import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentService } from '../../../core/services/content.service';
import { BehaviorSubject } from 'rxjs';
import { Challenge } from '../../../shared/models/challenge';
import { PlayService } from '../../../core/services/play.service';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent implements OnInit, DoCheck{
  challengeData: Challenge = new Challenge('');
  stringArray: string[] = []
  activeChallenge: string = ""
  challengeInteger: number = 0;
  @Input("id") id: number = 0;

  challengeForm: FormGroup = new FormGroup(
    {
    activeInput: new FormControl('', Validators.required)
  })

  constructor(private contentService:ContentService, private playService: PlayService){}

  ngOnInit(): void{
    this.contentService.getContents(this.id).subscribe({
      next: (res: Challenge) =>{
        this.challengeData = res;
        console.log(res)
        this.activeChallenge = res.challenge
        this.stringArray = res.challenge.split(',')
        console.log(this.activeChallenge)
        console.log(this.stringArray)
        //console.log("Array.from()", Array.from(this.stringArray))
      },
      error: (error:any) => {
        console.error('error fetching content', error);
      }
    })
  }

   ngDoCheck(): void{

    /* const formInput = this.challengeForm.value.activeInput
    const contentChallenge = this.challengeArray
    if(this.challengeArray){
      if(contentChallenge.length == formInput.length){
         this.playService.inputChecker(formInput, contentChallenge[this.challengeInteger])
      }
    } */
  }
}
