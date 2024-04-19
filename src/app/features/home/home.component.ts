import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/models/user';
import { RouterModule } from '@angular/router';
import { GameService } from '../../core/services/game.service';
import { Game } from '../../shared/models/game';
import { GameComponent } from '../../shared/components/game/game.component';
import { Score } from '../../shared/models/score';
import { ScoreboardService } from '../../core/services/scoreboard.service';
import { ScoreComponent } from '../../shared/components/score/score.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, GameComponent, ScoreComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  games: Game[] = [];
  userScores: Score[] = [];
  currentUser: User | null = null;
  constructor(
    private userService:UserService,
    private gameService: GameService,
    private scoreService: ScoreboardService
  ){}
  ngOnInit(): void {
    this.userService.currentUserBehaviorSubject.subscribe((user)=>{
      this.currentUser = user;})

    if(this.currentUser){
      this.gameService.homeGames(this.currentUser.id).subscribe({
        next: (games: Game[]) =>{
          this.games = games;
        },
        error: (error:any) => {
          console.error('error fetching games', error);
        }
      })

      this.scoreService.homeScores(this.currentUser.id).subscribe({
        next: (scores: Score[]) =>{
          this.userScores = scores
        },
        error: (error:any) => {
          console.error('error fetching scores', error);
        }
      })
  }
  }
}
