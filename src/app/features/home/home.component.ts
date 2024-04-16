import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/models/user';
import { RouterModule } from '@angular/router';
import { GameService } from '../../core/services/game.service';
import { Game } from '../../shared/models/game';
import { GameComponent } from '../../shared/components/game/game.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, GameComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  games: Game[] = [];
  currentUser: User | null = null;
  constructor(
    private userService:UserService,
    private gameService: GameService
  ){}
  ngOnInit(): void {
    this.userService.currentUserBehaviorSubject.subscribe((user)=>{
      this.currentUser = user;})

    if(this.currentUser){
      this.gameService.myGames(this.currentUser.id).subscribe({
        next: (games: Game[]) =>{
          this.games = games;
          console.log(games)
        },
        error: (error:any) => {
          console.error('error fetching games', error);
        }
      })
  }
  }
}
