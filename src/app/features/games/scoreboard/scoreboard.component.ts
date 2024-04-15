import { Component, Input, OnInit } from '@angular/core';
import { ScoreboardService } from '../../../core/services/scoreboard.service';
import { Score } from '../../../shared/models/score';
import anime from 'animejs';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss'
})
export class ScoreboardComponent implements OnInit{
  @Input("game_id")game_id: number = 0;
  scoreArray!: Score[];

  constructor(
    private scoreService: ScoreboardService,
    private userService: UserService){}

  ngOnInit(): void {
    this.scoreService.getScores(this.game_id).subscribe({
      next: (res: any) =>{
        //console.log(res)
        this.scoreArray = res
      }
    })
  }
}
