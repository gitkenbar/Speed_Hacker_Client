import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { FlashCard } from '../../shared/models/flashcard';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  constructor(private http:HttpClient) { }

  makeFlashCard(flashCardData: object){
    return this.http.post<FlashCard>(`${environment.apiUrl}/flashcards`, flashCardData)
  }
}
