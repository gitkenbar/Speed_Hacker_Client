import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { Definition } from '../../shared/models/definition';

@Injectable({
  providedIn: 'root'
})
export class DefinitionService {

  constructor(
    private http:HttpClient
  ) { }

  getDefinition(id: number): Observable<Definition>{
    return this.http.get<any>(`${environment.apiUrl}/definitions/${id}`)
  }
}
