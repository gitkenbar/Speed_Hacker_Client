import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  currentPage:number = 1;
  totalPages:number = 0
  games: Game[] = [];

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      const page = params['page'] ? Number(params['page']) : 1
      this.loadGames(page)
    })

  }


  loadGames(page:number){
    this.gameService.getGames(page).subscribe({
      next: (res: any) =>{
        this.games = res.games;
        this.currentPage = res.current_page;
        this.totalPages = res.total_pages;

      },
      error: (error:any) => {
        console.error('error fetching games', error);
      }
    })
  }

  nextPage() {
    if(this.currentPage < this.totalPages){
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage + 1},
        queryParamsHandling: 'merge'
      })
    }
  }

  previousPage(){
    if(this.currentPage > 1) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage - 1},
        queryParamsHandling: 'merge'
      })
    }
  }
}
