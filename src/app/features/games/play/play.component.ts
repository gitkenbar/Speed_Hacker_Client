import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentService } from '../../../core/services/content.service';
import { BehaviorSubject, ObservableInput } from 'rxjs';
import { Challenge } from '../../../shared/models/challenge';
import { PlayService } from '../../../core/services/play.service';
import { CommonModule } from '@angular/common';
import { InstanceComponent } from './instance/instance.component';
import { GameService } from '../../../core/services/game.service';

@Component({
  selector: 'app-play',
  standalone: true,
  providers: [ContentService],
  imports: [ReactiveFormsModule, CommonModule, InstanceComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent implements OnInit{
  challengeArray: Challenge[] = []
  @Input("id") id: number = 0;
  @Input() challenge: Challenge[] | null = [];

  responseForm!: FormGroup;

  constructor(
    private contentService:ContentService,
    private playService: PlayService,
    private formBuilder:FormBuilder,
    private gameService: GameService){}

  ngOnInit(): void{
    this.responseForm = this.gameService.toFormGroup(this.challenge as Challenge[])
    /* this.contentService.getContents(this.id).subscribe({
      next: (res: Challenge[]) =>{
        this.challengeData = res;
        this.challengeArray = res.challenge.replaceAll('[','').replaceAll(']','').replaceAll('"','').split(',')
      },
      error: (error:any) => {
        console.error('error fetching content', error);
      }
    }) */
  }

  get response() {
    return this.responseForm.get("responseGroup") as FormArray;
  }


  addResponse() {
    this.response.push(this.formBuilder.control(''))
  }

  inputCheck():boolean {
    //compare input.length to challenge.length, when input reaches maximum characters, the input disables and the cursor moves to the next challenge automatically
    return true
  }
}
