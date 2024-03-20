import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../core/services/content.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent implements OnInit{
  contentArray: string[] = [];

  constructor(private content:ContentService){}

  ngOnInit(): void{
    this.content.getContents().subscribe({
      next: (res: any) =>{
        console.log(res)
        this.contentArray = res;
      },
      error: (error:any) => {
        console.error('error fetching content', error);
      }
    })
  }
}
