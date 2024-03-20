import { Component, Input } from '@angular/core';
import { Game } from '../../models/game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  constructor(private router:Router){}
  @Input({required:true}) game:Game = new Game({})

  playGame(content_id:number){
    this.router.navigate([`play/${content_id}`])
  }
}
