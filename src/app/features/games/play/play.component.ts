import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentService } from '../../../core/services/content.service';
import { BehaviorSubject } from 'rxjs';
import { Challenge } from '../../../shared/models/challenge';
import { PlayService } from '../../../core/services/play.service';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent implements OnInit{
  challengeData: Challenge = new Challenge('');
  activeChallenge: string = ""
  stringArray: string[] = []
  challengeInteger: number = 0;
  @Input("id") id: number = 0;

  responseForm: FormGroup = new FormGroup(
    {})

  constructor(private contentService:ContentService, private playService: PlayService, private formBuilder:FormBuilder){}

  ngOnInit(): void{
    this.contentService.getContents(this.id).subscribe({
      next: (res: Challenge) =>{
        this.challengeData = res;
        this.activeChallenge = res.challenge.replaceAll('[','').replaceAll(']','')
        this.stringArray = res.challenge.replaceAll('[','').replaceAll(']','').replaceAll('"','').split(',')
      },
      error: (error:any) => {
        console.error('error fetching content', error);
      }
    })

    this.initializeForm()
  }

  initializeForm(){
    /* this.responseForm = this.formBuilder.array([this.formBuilder.control('')]) */

  }
}
