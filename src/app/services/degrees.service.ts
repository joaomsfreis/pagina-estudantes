import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DegreesService {

  constructor(private http: HttpClient) { }

  getDegrees(): Observable<any> {
    return this.http.get('../../assets/data/degrees.json');
  }
}
