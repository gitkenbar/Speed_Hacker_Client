import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GameService } from '../../../core/services/game.service';
import { Game } from '../../../shared/models/game';
import { ContentService } from '../../../core/services/content.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  providers: [ContentService, GameService],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit{

  currentUser!: User | null;
  gameForm: FormGroup = new FormGroup({
    gameName: new FormControl('', Validators.required),
    lineOne: new FormControl('', Validators.required),
    lineTwo: new FormControl('', Validators.required),
    lineThree: new FormControl('', Validators.required),
    lineFour: new FormControl('', Validators.required),
    lineFive: new FormControl('', Validators.required)
  })

  constructor(
    private contentService:ContentService,
    private gameService:GameService,
    private userService:UserService
  ){}

  ngOnInit(){
    this.userService.currentUserBehaviorSubject.subscribe((user)=>{
      this.currentUser = user;})
  }

  submit(){
    let formValue = Object.values(this.gameForm.value);
    let payload = {title: formValue.shift(), content: formValue}
    console.log(payload)
    this.gameService.makeGame(payload).subscribe({
      next: (res:any) =>{
        console.log(res)
      },
      error: (error:any) => {
        console.log("error", error)
        //this.isError = true
      }})
  }
}
