import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GameService } from '../../../core/services/game.service';
import { Game } from '../../../shared/models/game';
import { ContentService } from '../../../core/services/content.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user';

import { Subscription } from 'rxjs';
import { FlashcardService } from '../../../core/services/flashcard.service';


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

  // Da plan
  // make 'content' the key, add another array to hold the 'values' and construct the key value pairs by matching the two arrays
  gameForm: FormGroup = this.formBuilder.group({
    gameName: new FormControl('', Validators.required),
    content: this.formBuilder.array([this.formBuilder.control('', Validators.required)]),
    definition: this.formBuilder.array([this.formBuilder.control('', Validators.required)])
  })
  isFlashCard:boolean = false;
  contentSub!: Subscription;
  definitionSub!: Subscription;

  get title() {
    let title = this.gameForm.get("gameName") as FormControl;
    return title;
  }

  get content() {
    let contentArray = this.gameForm.get("content") as FormArray;
    return contentArray
  }

  get definition() {
    let definitionArray = this.gameForm.get("definition") as FormArray;
    return definitionArray
  }

  validateContent(){
    const createContentArray = this.content.value;
    let lastValidContentControl = createContentArray.at(-2)
    let newestContentControl = this.content.at(this.content.length - 1);


    if (newestContentControl.valid && !newestContentControl.pristine && this.duplicateChecker(createContentArray)) {
      this.addContent();
    }
  }

  validateDefinition(){
    let lastDefinitionControl = this.definition.at(this.definition.length - 1);

    if (lastDefinitionControl.valid && !lastDefinitionControl.pristine){
      this.addDefinition();
    }
  }

  addContent(){
    this.content.push(this.formBuilder.control(''));
  }

  addDefinition() {
    this.definition.push(this.formBuilder.control(''));
  }

  constructor(
    private formBuilder:FormBuilder,
    private flashCardService:FlashcardService,
    private gameService:GameService,
    private userService:UserService,
    private router:Router
  ){}

  ngOnInit(){
    this.userService.currentUserBehaviorSubject.subscribe((user)=>{
      this.currentUser = user;})

    this.contentSub = this.content.valueChanges.subscribe(()=> {
      this.validateContent();
    })

    this.definitionSub = this.definition.valueChanges.subscribe(()=> {
      this.validateDefinition()
    })
  }

  submit(){
    // Selectors
    let titleValue = this.title.value
    let contentsValue = this.content.value
    let definitionValue!:any
    if(this.isFlashCard){
      definitionValue = this.definition.value
    }
    if(contentsValue[contentsValue.length - 1] == ''){
    contentsValue.pop()}

    // Payload object builder
    let gamePayload = {title: titleValue, content: contentsValue}
    let contentId!:number
    let flashcardPayload = {title: titleValue, content: contentsValue, definition: definitionValue}

    // Submit with Game Service
    this.gameService.makeGame(gamePayload).subscribe({
      next: (res:any) =>{
        // Route to scoreboard if it's just a challenge
        if(!this.isFlashCard){
          this.router.navigate([`/scores/${res.id}`])
        }else{
          this.flashCardService.makeFlashCard(flashcardPayload).subscribe({
            next: (res:any) =>{
              console.log(res)
              //route to Flashcard
              // TODO: Create flashcard component
            },
            error: (error:any) =>{
              console.log("error", error)
              this.isError = true
              this.returnedError = error
            }
          })
        }
      },
      error: (error:any) => {
        console.log("error", error)
        this.isError = true
        this.returnedError = error
      }
    })
  }


  toggleFlashCard() {
    this.isFlashCard = !this.isFlashCard

  duplicateChecker(inputArray: []): boolean{
    let duplicate = []
    //for loop that checks value of each entry against every other entry
    let inputIndex = 0
    let errorIndex!: number
    for(let i of inputArray){
      //remove i from inputArray
      let arrayCopy = inputArray
      arrayCopy.splice(inputIndex, 1)

      //update index
      inputIndex++
      //check if arrayCopy has an i
      if(arrayCopy.includes(i)){
        console.log(inputIndex)
        duplicate.push(inputIndex)
      }
    }
    if(duplicate[0]){
      console.log("duplicate", duplicate[0])
      return false
    } else {
      console.log("NO DUPLICATES")
      return true
    }


    /* duplicateChecker(inputArray: []): boolean{
      const valueHolder = new Map<number, string>()
      let totalItems = inputArray.length;
      let duplicateItems:any = [];
      //for loop that checks value of each entry against every other entry
      let inputIndex = 0
      for (let input of inputArray) {
        valueHolder.set(inputIndex, input);
        inputIndex++;
        if(valueHolder.has(input)){
          duplicateItems > input
        }
      }
      console.log(valueHolder)

      if(!duplicateItems[0]) {
        return true
      }
        else {
          return false
        }
    } */

  }
}
