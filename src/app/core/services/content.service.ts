import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContentService{

  constructor(private http:HttpClient, private route: ActivatedRoute) { }

  getContents(id: number): Observable<any>{
    console.log("content service: getContents(id)", id)
    return this.http.get<any>(`${environment.apiUrl}/contents/${id}`)
  }

}
