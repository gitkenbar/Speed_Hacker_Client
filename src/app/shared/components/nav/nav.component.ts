import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

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
    private userService: UserService
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
    this.toggleSidebar();
    this.authService.logout();
  }

  toggleSidebar(){
    this.isSidebarVisible = !this.isSidebarVisible
  }
}
