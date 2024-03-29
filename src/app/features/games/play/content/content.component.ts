import { Component, Input, OnInit, Output } from '@angular/core';
import { Challenge } from '../../../../shared/models/challenge';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChallengeComponent } from './challenge/challenge.component';
import { CommonModule } from '@angular/common';
import { GameService } from '../../../../core/services/game.service';

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
  payLoad = '';

  constructor(private gameService: GameService){}

  ngOnInit() {
    //this.form = this.gameService.toFormGroup(this.challenge as Challenge);
  }
}


//apr 27 interview

//apr 29 - may 23 employer project
