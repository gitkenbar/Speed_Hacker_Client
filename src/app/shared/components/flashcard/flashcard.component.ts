import { Component, Input } from '@angular/core';
import { FlashCard } from '../../models/flashcard';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flashcard.component.html',
  styleUrl: '../shared.shared.scss'
})
export class FlashcardComponent {
  @Input({required:true}) card:FlashCard = new FlashCard({})
  username!: string;
  currentUser: User | null = null;
  userInfo!: User;

  constructor(
    private router: Router,
    private userService: UserService,
  ){}

  ngOnInit():void{
    this.userService.currentUserBehaviorSubject.subscribe((user)=>{
      this.currentUser = user;
    })
    if(this.card){
      this.userService.getUserInfo(this.card.user_id).subscribe({
        next: (user: any) =>{
          this.userInfo = user
        },
        error: (error:any) => {
          console.error('error fetching user', error);
        }
    })
  }
  }

  getCards(flashcard_id: number){
    this.router.navigate([`cards/${flashcard_id}`])
  }
}
