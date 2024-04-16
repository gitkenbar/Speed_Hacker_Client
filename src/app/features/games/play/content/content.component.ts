import { Component, Input, OnInit, Output } from '@angular/core';
import { Challenge } from '../../../../shared/models/challenge';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChallengeComponent } from './challenge/challenge.component';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../../core/services/game.service';
import { ScoringService } from '../../../../core/services/scoring.service';
import { Router } from '@angular/router';
import { Game } from '../../../../shared/models/game';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../shared/models/user';
import { PlayComponent } from '../play.component';

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
  @Input() gameData!: Game;
  currentUser: User | null = null;
  userInput!: string;

  constructor(
    private gameService: GameService,
    private scoreService: ScoringService,
    private router: Router,
    private userService: UserService,
    private playComponent: PlayComponent){}

  score(){
    let responseString: string = Object.values(this.form.value).toString()
    let challengeString: string = this.challengeArray.toString()
    if(this.currentUser){
      this.scoreService.scoreIt(
        this.currentUser.id,
        this.gameData.id,
        challengeString,
        responseString,
        this.timeRemaining)
    }
    clearInterval(this.playComponent.interval)

    //this.router.navigate([`/scores/${this.gameData.id}`])
  }

  ngOnInit() {
    this.userService.currentUserBehaviorSubject.subscribe((user)=>{
      this.currentUser = user;
    })
    //this.form = this.gameService.toFormGroup(this.challenge as Challenge);
  }

  get timeRemaining(){
    return (this.minutes * 60) + this.seconds
  }
}


//apr 27 interview

//apr 29 - may 23 employer project
