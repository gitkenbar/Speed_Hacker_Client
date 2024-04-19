import { Component, Input, OnInit } from '@angular/core';
import { Score } from '../../models/score';
import { Router } from '@angular/router';
import { GameService } from '../../../core/services/game.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: '../shared.shared.scss'
})
export class ScoreComponent implements OnInit{
  @Input({required:true}) score:Score = new Score({})
  gameInfo!: Game
  constructor(
    private router: Router,
    private gameService: GameService) {
  }

  ngOnInit(): void {
    this.gameService.gameInfo(this.score.game_id).subscribe({
      next: (game: Game) =>{
        console.log(game)
        this.gameInfo = game
      },
      error: (error:any) => {
        console.error('error fetching games', error);
      }
  })
  }

  playGame(){
    this.router.navigate([`play/${this.gameInfo.id}`])
    }
}
