import { Component, Input, OnInit, Output } from '@angular/core';
import { Challenge } from '../../../../shared/models/challenge';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChallengeComponent } from './challenge/challenge.component';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../../core/services/game.service';
import { ScoringService } from '../../../../core/services/scoring.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ChallengeComponent],
  providers: [GameService],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit{
  @Input() challengeArray: string[] = []
  @Input() challenge!: Challenge;
  @Input() form!: FormGroup;
  @Input() minutes!: number;
  @Input() seconds!: number;
  payLoad = '';

  constructor(
    private gameService: GameService,
    private scoreService: ScoringService){}

  score(){
    let responseString: string = Object.values(this.form.value).toString()
    let challengeString: string = this.challengeArray.toString()
    //let stringifiedUserInput = responseFormArray.toString()
    //console.log(Object.values(this.form.value))
    this.scoreService.scoreIt(challengeString, responseString, this.timeRemaining)
  }

  ngOnInit() {
    //this.form = this.gameService.toFormGroup(this.challenge as Challenge);
  }

  get timeRemaining(){
    return (this.minutes * 60) + this.seconds
  }
}


//apr 27 interview

//apr 29 - may 23 employer project
