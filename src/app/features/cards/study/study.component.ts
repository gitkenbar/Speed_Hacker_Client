import { Component, Input, OnInit } from '@angular/core';
import { ContentService } from '../../../core/services/content.service';
import { FlashcardService } from '../../../core/services/flashcard.service';
import { Router } from '@angular/router';
import { DefinitionService } from '../../../core/services/definition.service';
import { FlashCard } from '../../../shared/models/flashcard';
import { Challenge } from '../../../shared/models/challenge';
import { Definition } from '../../../shared/models/definition';

@Component({
  selector: 'app-study',
  standalone: true,
  providers: [ContentService, FlashcardService, DefinitionService],
  imports: [],
  templateUrl: './study.component.html',
  styleUrl: './study.component.scss'
})
export class StudyComponent implements OnInit{
  @Input("id")id:number = 0
  flashcard!:FlashCard
  content!:Challenge
  definition!:Definition

  constructor(
    private contentService:ContentService,
    private definitionService:DefinitionService,
    private flashcardService:FlashcardService,
    private router: Router,
  ){}

  ngOnInit(): void{
    this.flashcardService.flashCardInfo(this.id).subscribe({
      next: (res: any) =>{
        this.flashcard = res
        this.makeCards()
      },
      error: (error: any) => {
        console.error('error fetching card data', error)
      }
    })
  }

  makeCards(){
    this.contentService.getContents(this.flashcard.content_id).subscribe({
      next: (res: any) =>{
        this.content = res
        console.log(res)
        this.definitionService.getDefinition(this.flashcard.definition_id).subscribe({
          next: (res: any) =>{
            this.definition = res
            console.log(res)
          },
          error: (error: any) => {
            console.error('error fetching definition',error)
          }
        })
      },
      error: (error:any)=> {
        console.error('error fetching content', error);
      }
    })
  }
}
