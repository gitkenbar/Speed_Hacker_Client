import { Component, OnInit, Signal, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { KatakanaService } from '../../../core/services/katakana.service';
import { interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})

export class NavComponent implements OnInit{
  isSidebarVisible:boolean = false;
  isTitleHover: boolean = false;
  titleHolder!: string;
  titleHoverText = signal("Speed Hacker")

  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private katakana: KatakanaService
    ){}

  ngOnInit(): void {

    // - This instantiates the user
    this.userService.currentUserBehaviorSubject.subscribe((user)=>{
      this.currentUser = user;
    })
    // - This grabs the page title and slaps it into the titleHolder attribute
    this.titleHoverText.update((current)=>
      this.titleHolder = current
    )
  }

  isLoggedIn(){
    //should be a behavior subject!
    return this.authService.isLoggedIn();
  }

  logout(){
    if(this.isSidebarVisible){
      this.toggleSidebar();
    }
    this.authService.logout();
    this.userService.setCurrentUser(null);
  }

  toggleSidebar(){
    this.isSidebarVisible = !this.isSidebarVisible
  }

  katakanaStart(){
    // - This Works!
    // - This converts the Title text into random characters
    this.titleHoverText.update((current)=>
      this.katakana.katakanaIt(current)
    )

    const katakanaInterval$ = interval(1000)

    while(this.isTitleHover){
        katakanaInterval$.pipe(

        )
      let i = 0
      let newChar = this.katakana.getKatakana()
      console.log(newChar)
      this.setCharAt(this.titleHoverText(), i, newChar)
      i++
      if(i = this.titleHoverText().length){
        i = 0
      }
    }
  }

  katakanaEnd(){
    // This makes the page Title revert to it's original state
    this.titleHoverText.update(() =>
      this.titleHolder)
  }

  toggleTitleHover(){
    this.isTitleHover = !this.isTitleHover
    if(this.isTitleHover){
      this.katakanaStart()
      } else {
        this.katakanaEnd()
      }
  }

  setCharAt(str:string, i:number, char:string){
    return str.substring(0, i) + char + str.substring(i+1)
  }
}
