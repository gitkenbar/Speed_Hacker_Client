import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GameService } from '../../../core/services/game.service';
import { Game } from '../../../shared/models/game';
import { ContentService } from '../../../core/services/content.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  providers: [ContentService, GameService],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit{
  // Error Handling
  isError: boolean = false;
  returnedError!: any;
  // User
  currentUser!: User | null;

  // Form
  gameForm: FormGroup = this.formBuilder.group({
    gameName: new FormControl('', Validators.required),
    content: this.formBuilder.array([this.formBuilder.control('')])
  })

  contentSub!: Subscription;

  get content() {
    let contentArray = this.gameForm.get("content") as FormArray;
    return contentArray
  }

  validateContent(){
    let lastContentControl = this.content.at(this.content.length - 1);

    if (lastContentControl.valid && !lastContentControl.pristine) {
      this.addContent();
    }
  }

  addContent(){
    this.content.push(this.formBuilder.control(''));
  }

  constructor(
    private formBuilder:FormBuilder,
    private contentService:ContentService,
    private gameService:GameService,
    private userService:UserService
  ){}

  ngOnInit(){
    this.userService.currentUserBehaviorSubject.subscribe((user)=>{
      this.currentUser = user;})

    this.contentSub = this.content.valueChanges.subscribe(()=> {
      this.validateContent();
    })
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
        this.isError = true
        this.returnedError = error
      }
    })
  }
}
