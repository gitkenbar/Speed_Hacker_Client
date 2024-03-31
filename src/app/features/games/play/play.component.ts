import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContentService } from '../../../core/services/content.service';
import { Challenge } from '../../../shared/models/challenge';
import { PlayService } from '../../../core/services/play.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { InstanceComponent } from './instance/instance.component';
import { GameService } from '../../../core/services/game.service';
import { Observable, map, takeWhile, timer } from 'rxjs';
import { ContentComponent } from './content/content.component';
import { Game } from '../../../shared/models/game';

@Component({
  selector: 'app-play',
  standalone: true,
  providers: [ContentService, GameService],
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule, ContentComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent implements OnInit{
  @Output() challengeArray: string[] = []
  @Input("id") id: number = 0;
  @Input() challenge!: Challenge;
  @Input() challengeSub$: Observable<Challenge>
  @Input() gameData!: Game;
  @Output() responseForm!: FormGroup;
  gameTitle!:string;

  minutes: number = 2;
  seconds: number = 0o0;

  countdown() {
    const interval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else if (this.minutes > 0 && this.seconds === 0) {
        this.seconds = 59;
        this.minutes--;
      } else {
        clearInterval(interval);
        console.log("Time is Up!")
      }
    }, 1000);
  }

  constructor(
    private contentService:ContentService,
    private gameService: GameService)
    {
      this.challengeSub$ = contentService.getContents(this.id)
    }

  ngOnInit(): void{
    this.gameService.gameInfo(this.id).subscribe({
      next: (res: any) =>{
        this.gameData = res
      },
      error: (error:any) => {
        console.error('error fetching game data',error);
      }
    });

    this.contentService.getContents(this.id).subscribe({
      next: (res: any) =>{
        this.challenge = res
        this.challengeArray = JSON.parse(res.challenge)
        //console.log(this.challengeArray)
        this.responseForm = this.gameService.toFormGroup(this.challenge as Challenge)
      },
      error: (error:any) => {
        console.error('error fetching content', error);
      }
    });

    this.countdown()
  }

  get response() {
    return this.responseForm.get("responseGroup") as FormArray;
  }

  inputCheck():boolean {
    //compare input.length to challenge.length, when input reaches maximum characters, the input disables and the cursor moves to the next challenge automatically
    return true
  }
}
