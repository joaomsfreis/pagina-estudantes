import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentsService {

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get('../../assets/data/students.json');
  }

  addStudents( students: any[], classes: any[], degrees: any[]) {
    let randomClasses = 0;
    let randomDegrees = 0;

    let student = {};
    let id = 0;
    let ra = 0;
    let name = '';
    let degreeId = 0;
    let classId = 0;

    for (let i = 0; i < 300; i++) {
      randomClasses = Math.floor(Math.random() * classes.length);
      randomDegrees = Math.floor(Math.random() * degrees.length);

      id = students.length + 1;
      ra = Math.floor(Math.random() * 100000);
      name = `Nome do aluno ${id}`;
      degreeId = degrees[randomDegrees].id;
      classId = classes[randomClasses].id;

      student = { id, ra, name, degreeId, classId };
      students = [...students, student];
    }

    return students;
  }
}
