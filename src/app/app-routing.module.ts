import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';


const routes: Routes = [
  {path: 'students', component: StudentsComponent},
  {
    path: '',
    redirectTo: '/students',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
