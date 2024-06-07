import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../shared/models/game';
import { environment } from '../../../environment/environment';
import { FormControl, FormGroup } from '@angular/forms';
import { Challenge } from '../../shared/models/challenge';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http:HttpClient) { }

  makeGame(gameData: object){
    return this.http.post<Game>(`${environment.apiUrl}/games`, gameData)
  }

  getGames(): Observable<Game[]>{
    return this.http.get<Game[]>(`${environment.apiUrl}/games`)
  }

  myGames(id: number): Observable<Game[]>{
    return this.http.get<Game[]>(`${environment.apiUrl}/users/${id}/usergames/`)
  }

  homeGames(id: number): Observable<Game[]>{
    return this.http.get<Game[]>(`${environment.apiUrl}/users/${id}/homegames/`)
  }

  deleteGame(id: number): Observable<any>{
    return this.http.delete<Game>(`${environment.apiUrl}/games/${id}`)
  }

  gameInfo(id: number): Observable<Game>{
    return this.http.get<any>(`${environment.apiUrl}/games/${id}`)
  }

  toFormGroup(content: Challenge){
    const group: any = {};
    //console.log(content)
    const challengeArray: [] = JSON.parse(content.challenge)
    //console.log(challengeArray)
    for(let key of challengeArray){
      group[challengeArray.indexOf(key)] = new FormControl({value:'', disabled: false})
    }
    //console.log(group)

    return new FormGroup(group)
  }
}
