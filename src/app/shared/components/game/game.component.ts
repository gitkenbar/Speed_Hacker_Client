import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../models/user';
import { GameService } from '../../../core/services/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: '../shared.shared.scss'
})
export class GameComponent implements OnInit{
  @Input({required:true}) game:Game = new Game({})
  username!: string;
  currentUser: User | null = null;
  userInfo!: User;

  constructor(
    private router:Router,
    private userService: UserService,
    private gameService: GameService
  ){}

  ngOnInit():void{
    this.userService.currentUserBehaviorSubject.subscribe((user)=>{
      this.currentUser = user;
    })
    if(this.game){
      this.userService.getUserInfo(this.game.user_id).subscribe({
        next: (user: any) =>{
          this.userInfo = user
        },
        error: (error:any) => {
          console.error('error fetching user', error);
        }
    })
    }
  }
  playGame(content_id:number){
    this.router.navigate([`play/${content_id}`])
  }

  viewScores(game_id: number){
    this.router.navigate([`scores/${game_id}`])
  }
}
