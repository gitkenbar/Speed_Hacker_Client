import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { FlashCard } from '../../shared/models/flashcard';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  constructor(private http:HttpClient) { }

  makeFlashCard(flashCardData: object){
    return this.http.post<FlashCard>(`${environment.apiUrl}/flashcards`, flashCardData)
  }

  getFlashCard(page: number): Observable<FlashCard[]>{
    return this.http.get<FlashCard[]>(`${environment.apiUrl}/flashcards?page=${page}`)
  }
}
