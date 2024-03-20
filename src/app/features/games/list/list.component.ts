import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Game } from '../../../shared/models/game';
import { GameService } from '../../../core/services/game.service';
import { GameComponent } from '../../../shared/components/game/game.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterModule, GameComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  games: Game[] = [];

  constructor(private gameService: GameService){}

  ngOnInit(): void {
    this.gameService.getGames().subscribe({
      next: (games: Game[]) =>{
        console.log(games)
        this.games = games;
      },
      error: (error:any) => {
        console.error('error fetching games', error);
      }
    })
  }
}
