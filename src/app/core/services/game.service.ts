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

  toFormGroup(challenge: Challenge[]){
    const group: any = {};

    challenge.forEach(challenge => {
      group[challenge.id] = new FormControl(challenge.challenge || '')
    })

    return new FormGroup(group)
  }
}
