import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Score } from '../../shared/models/score';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {

  constructor(
    private http:HttpClient
  ) { }

  getScores(game_id: number): Observable<Score[]>{
    return this.http.get<Score[]>(`${environment.apiUrl}/scores/${game_id}`)
  }

  userScores(user_id: number): Observable<Score[]>{
    return this.http.get<Score[]>(`${environment.apiUrl}/users/${user_id}/userscores`)
  }
  homeScores(user_id: number): Observable<Score[]>{
    return this.http.get<Score[]>(`${environment.apiUrl}/users/${user_id}/homescores`)
  }
}
