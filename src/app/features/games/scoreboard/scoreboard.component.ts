import { Component, Input, OnInit } from '@angular/core';
import { ScoreboardService } from '../../../core/services/scoreboard.service';
import { Score } from '../../../shared/models/score';
import anime from 'animejs';
import { UserService } from '../../../core/services/user.service';
import { Router, RouterModule } from '@angular/router';
import { ScoringService } from '../../../core/services/scoring.service';
import { ScoreCard } from '../../../shared/models/scorecard';
import { GameService } from '../../../core/services/game.service';
import { Game } from '../../../shared/models/game';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss'
})
export class ScoreboardComponent implements OnInit{
  @Input("game_id")game_id: number = 0;
  scorecard!: ScoreCard;
  scoreArray!: Score[];
  gameData!: Game;

  constructor(
    private scoreService: ScoreboardService,
    private scoringService: ScoringService,
    private userService: UserService,
    private router: Router,
    private gameService: GameService){}

  ngOnInit(): void {
    this.scoreService.getScores(this.game_id).subscribe({
      next: (res: any) =>{
        //console.log(res)
        this.scoreArray = res
      }
    })
    this.scorecard = this.scoringService.getScorecard()
    this.gameService.gameInfo(this.game_id).subscribe({
      next: (res: any) =>{
        this.gameData = res
      },
      error: (error:any) => {
        console.error('error fetching game data',error);
      }
    });
    this.animateNumber('newScore')
  }

  tryAgain(){
    this.router.navigate([`play/${this.game_id}`])
  }

  animateNumber(target: any) {
    let totalScore = document.getElementById(target);

    anime({
      targets: totalScore,
      innerHTML: [0, this.scorecard.totalScore],
      easing: 'linear',
      round: 10 // Will round the animated value to 1 decimal
    });
  }
}
