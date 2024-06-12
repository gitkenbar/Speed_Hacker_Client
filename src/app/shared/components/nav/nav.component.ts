import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { KatakanaService } from '../../../core/services/katakana.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  isSidebarVisible:boolean = false;
  titleHover: boolean = false;
  titleHolder!: HTMLElement

  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private katakana: KatakanaService
    ){}

  ngOnInit(): void {
    this.userService.currentUserBehaviorSubject.subscribe((user)=>{
      this.currentUser = user;
    })
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

  katakanaIt(){
    let target: HTMLElement | null = document.getElementById("SpeedHacker");
    if(target){
      this.titleHolder = target
      for(let char of target.innerHTML){
        let index = 0
        index + 1;
        if(index >= target.innerHTML.length){
          index = 0
        }
      }
     let animationText = this.katakana.katakanaIt(target?.innerHTML)
     let newDiv = document.createElement("div")
     let newTitle = document.createElement("h3")
      newTitle.innerHTML = animationText;
      newTitle.id = "newTitle";
      // This isn't working!
      // Debug button works though
      newTitle.addEventListener("mouseleave", this.toggleTitleHover)


      let oldTitle = target?.innerText
      target?.parentNode?.replaceChild(newTitle, target)
    }

  }

  fixit(){
    console.log("Fixin' it")
    let newTitle: any = document.getElementById("newTitle")
    let oldTitle = this.titleHolder
    console.log(oldTitle)
    newTitle?.parentNode?.replaceChild(oldTitle, newTitle)
  }

  toggleTitleHover(){
    this.titleHover = !this.titleHover
    console.log(this.titleHover)
    if(this.titleHover){
      this.katakanaIt()
    } else {
      this.fixit()
    }
  }
}
