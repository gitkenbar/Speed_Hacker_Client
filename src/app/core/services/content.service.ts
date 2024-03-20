import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContentService implements OnInit{
  id: number = 0;
  private sub: any;
  constructor(private http:HttpClient, private route: ActivatedRoute) { }

  getContents(): Observable<string[]>{
    return this.http.get<string[]>(`${environment.apiUrl}/contents/${this.id}`)
  }

  ngOnInit(): void {
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id'];
      })
  }
}
