import { Component } from '@angular/core';
import { FlashCard } from '../../../shared/models/flashcard';
import { FlashcardService } from '../../../core/services/flashcard.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FlashcardComponent } from '../../../shared/components/flashcard/flashcard.component';

@Component({
  selector: 'app-cardlist',
  standalone: true,
  imports: [RouterModule, FlashcardComponent],
  templateUrl: './cardlist.component.html',
  styleUrl: './cardlist.component.scss'
})
export class CardlistComponent {
  currentPage:number = 1;
  totalPages:number = 0
  cards: FlashCard[] = [];

  constructor(
    private cardservice: FlashcardService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      const page = params['page'] ? Number(params['page']) : 1
      this.loadCards(page)
    })
  }

  loadCards(page:number){
    this.cardservice.getFlashCard(page).subscribe({
      next: (res:any) =>{
        this.cards = res.flashcard;
        this.currentPage = res.current_page;
        this.totalPages = res.total_pages;
      },
      error: (error: any) => {
        console.error('error fetching flash-cards', error);
      }
    })
  }

  nextPage(){
    if(this.currentPage < this.totalPages) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {page: this.currentPage + 1},
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
