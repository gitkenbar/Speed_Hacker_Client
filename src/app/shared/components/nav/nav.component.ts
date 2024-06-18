import { Component, OnInit, Signal, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { KatakanaService } from '../../../core/services/katakana.service';
import { Subscription, interval, switchMap } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

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
  oneSec!: any;

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


  // AUTH

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

  // SIDEBAR

  toggleSidebar(){
    this.isSidebarVisible = !this.isSidebarVisible
  }

  // KATAKANA

  katakanaStart(){
    // - This converts the Title text into random characters
     this.titleHoverText.update((current)=>
      this.katakana.katakanaIt(current)
    )
  }

  katakanaEnd(){
    // This makes the page Title revert to it's original state
    this.titleHoverText.update(() =>
      this.titleHolder)
  }

  toggleTitleHover(){
    // Flips controller boolean
    this.isTitleHover = !this.isTitleHover

    // Does different action based on boolean state
    if(this.isTitleHover){
      this.oneSec = setInterval(() => {this.katakanaStart(), console.log("onesec Active")}, 1000)
      } else {
        clearInterval(this.oneSec)
        this.katakanaEnd()
      }
  }

  setCharAt(str:string, i:number, char:string){
    return str.substring(0, i) + char + str.substring(i+1)
  }
}
