import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent{
  @Input({required:true}) game:Game = new Game({})
  username!: string;

  constructor(
    private router:Router,
    private userService: UserService
  ){}

  playGame(content_id:number){
    this.router.navigate([`play/${content_id}`])
  }
}
