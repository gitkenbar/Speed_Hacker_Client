import { Component, Input, OnInit } from '@angular/core';
import { ScoreboardService } from '../../../core/services/scoreboard.service';
import { Score } from '../../../shared/models/score';

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
    private scoreService: ScoreboardService){}

  ngOnInit(): void {

    console.log(this.game_id)
    this.scoreService.getScores(this.game_id).subscribe({
      next: (res: any) =>{
        console.log(res)
        this.scoreArray = res
      }
    })
  }

  // This component needs to take in a game_id, and populate a table with scores with that game_id, and sort those scores from highest to lowest.
}
