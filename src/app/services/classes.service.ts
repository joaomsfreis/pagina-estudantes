import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http: HttpClient) { }

  getClasses(): Observable<any> {
    return this.http.get('../../assets/data/classes.json');
  }
}
