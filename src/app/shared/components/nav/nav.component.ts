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
    this.katakana.katakanaIt(document.querySelector('.title')?.innerHTML);
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
}
