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

  getGames(): Observable<Game[]>{
    return this.http.get<Game[]>(`${environment.apiUrl}/games`)
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
