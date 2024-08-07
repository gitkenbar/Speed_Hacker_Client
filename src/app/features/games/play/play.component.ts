import { Component, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContentService } from '../../../core/services/content.service';
import { Challenge } from '../../../shared/models/challenge';
import { PlayService } from '../../../core/services/play.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { GameService } from '../../../core/services/game.service';
import { Observable, map, takeWhile, timer } from 'rxjs';
import { ContentComponent } from './content/content.component';
import { Game } from '../../../shared/models/game';
import { Router } from '@angular/router';
import { ScoringService } from '../../../core/services/scoring.service';

@Component({
  selector: 'app-play',
  standalone: true,
  providers: [ContentService, GameService],
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule, ContentComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent implements OnInit, OnDestroy{
  @ViewChild(ContentComponent) contentCompent!:ContentComponent;
  @Output() challengeArray: string[] = []
  @Input("id") id: number = 0;
  @Input() challenge!: Challenge;
  @Input() challengeSub$: Observable<Challenge>;
  @Input() gameData!: Game;
  @Output() responseForm!: FormGroup;
  gameTitle!:string;

  @Output() minutes: number = 2;
  @Output() seconds: number = 0o0;
  interval!: any;

  countdown() {
    this.interval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else if (this.minutes > 0 && this.seconds === 0) {
        this.seconds = 59;
        this.minutes--;
      } else {
        clearInterval(this.interval);
        console.log("Time is Up!")
        this.contentCompent.score()
        this.router.navigate([`/scores/${this.id}`])
      }
    }, 1000);
  }

  constructor(
    private contentService:ContentService,
    private gameService: GameService,
    private router: Router,
    private scoringservice: ScoringService)
    {
      this.challengeSub$ = contentService.getContents(this.id)
    }

  ngOnInit(): void{
    this.gameService.gameInfo(this.id).subscribe({
      next: (res: any) =>{
        this.gameData = res
        this.getContent()
      },
      error: (error:any) => {
        console.error('error fetching game data',error);
      }
    });

  }

  getContent() {
    this.contentService.getContents(this.gameData.content_id).subscribe({
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

  ngOnDestroy() {
    clearInterval(this.interval)
  }

  get response() {
    return this.responseForm.get("responseGroup") as FormArray;
  }

  inputCheck():boolean {
    //compare input.length to challenge.length, when input reaches maximum characters, the input disables and the cursor moves to the next challenge automatically
    return true
  }

}
