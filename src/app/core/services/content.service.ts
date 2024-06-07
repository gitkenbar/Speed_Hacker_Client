import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Challenge } from '../../shared/models/challenge';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class ContentService{

  constructor(
    private http:HttpClient,
    private route: ActivatedRoute
  ) { }

  createContent(content: any): Observable<any>{
    console.log(content)
    return this.http.post<any>(`${environment.apiUrl}/contents/`, content)
  }

  getContents(id: number): Observable<Challenge>{
    return this.http.get<any>(`${environment.apiUrl}/contents/${id}`)
  }
}
