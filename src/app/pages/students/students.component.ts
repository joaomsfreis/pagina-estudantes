import { ClassesService } from './../../services/classes.service';
import { DegreesService } from './../../services/degrees.service';
import { StudentsService } from './../../services/students.service';
import { Component } from '@angular/core';
import { Chart, OnInit} from 'chart.js'

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {
  students: any[];
  studentsView: any[];
  classes: any[];
  degrees: any[];
  student: any;
  edit = false;
  degreeId = 0;
  classId = 0;
  ableChart = false;
  chart;

  constructor(
      private studentsService: StudentsService,
      private degreesService: DegreesService,
      private classesService: ClassesService
    ) {
    this.getStudents();
    this.getClasses();
    this.getDegrees();
  }

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        datasets: [
          {
            backgroundColor: '#0275d8'
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Quantidade de alunos por período',
          fontSize: 20,
        },
        legend: {
          display: false
        },
        responsive: true,
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Número de alunos',
              fontSize: 15,
            },
            ticks: {
              beginAtZero: true,
              fontSize: 15
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 15
            }
          }]
        }
      }
    });
  }

  getStudents() {
    this.studentsService.getStudents().subscribe(data => {
      this.students = data;
    }, err => {
      console.log(err);
    });
  }

  getClasses() {
    this.classesService.getClasses().subscribe(data => {
      this.classes = data.classes;
    }, err => {
      console.log(err);
    });
  }

  getDegrees() {
    this.degreesService.getDegrees().subscribe(data => {
      this.degrees = data;
    }, err => {
      console.log(err);
    });
  }

  getDegreeById(id: any) {
    return this.degrees.filter(degree => degree.id === parseInt(id));
  }

  getClassById(id: any) {
    return this.classes.filter(item => item.id === parseInt(id));
  }

  mountStudents(arrayStudents: any ) {
    this.numStudentsByDegree();
    this.studentsView = arrayStudents.map(student => {
      const objClass = this.getClassById(student.classId);
      const objDegreee = this.getDegreeById(student.degreeId);

      return {
        id: student.id,
        ra: student.ra,
        name: student.name,
        classId: objClass[0],
        degreeId: objDegreee[0]
      };
    });
  }

  addNewStudents() {
    this.students = this.studentsService.addStudents(this.students, this.classes, this.degrees);
    this.mountStudents(this.students);
  }

  startEditStudent( studentToEdit: any ) {
    const classId = studentToEdit.classId.id;
    const degreeId = studentToEdit.degreeId.id;

    this.student = studentToEdit;
    this.student.classId = classId;
    this.student.degreeId = degreeId;
    this.edit = true;
  }

  cancelEdit() {
    this.edit = false;
    this.mountStudents(this.students);
  }

  editStudent() {
    this.students = this.students.map(studentOld => {
      if (studentOld.id === this.student.id) {
        return this.student;
      }
      return studentOld;
    });
    this.mountStudents(this.students);
    this.edit = false;
  }

  filterStudents() {
    const filterStudents = this.students.filter(student => ((student.classId == this.classId || this.classId == 0) && (student.degreeId == this.degreeId || this.degreeId == 0)));

    this.mountStudents(filterStudents);
  }

  numStudentsByDegree() {
    this.ableChart = true;
    if (this.degrees) {
      const degreesLabel = [];
      for (let degree of this.degrees) {
        degreesLabel[degree.id] = degree.name;
      }

      const arrayStudentsByDegree = this.degrees.map(() => 0);
      arrayStudentsByDegree[13] = 0;
      for (let studentItem of this.students) {
        arrayStudentsByDegree[studentItem.degreeId]++;
      }
      degreesLabel.shift();
      arrayStudentsByDegree.shift();
      this.chart.data.labels = degreesLabel;
      this.chart.data.datasets[0].data = arrayStudentsByDegree;
      this.chart.update();
    }
  }

}
