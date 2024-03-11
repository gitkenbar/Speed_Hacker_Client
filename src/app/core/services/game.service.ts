import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../shared/models/game';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http:HttpClient) { }

  getGames(): Observable<Game[]>{
    return this.http.get<Game[]>(`${environment.apiUrl}/games`)
  }
}
