import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

class Student
{
  id;
  firstName;
  lastName;
  age;
}


@Component({
  selector: 'app-student',
  template: `
      <div *ngIf="students">
        <h1> List of Students </h1>
        <table border='1'>
          <tr *ngFor="let student of students">
            <td> 
              <a href="#" (click)="readOneStudent(student.id)">
               {{ student.id }} 
              </a>
            </td>
            <td> {{ student.firstName}} </td>
            <td> {{ student.lastName}} </td>
            <td> {{ student.age}} </td>
            <td> 
                  <button (click)="deleteStudent(student.id)">
                    Delete {{ student.firstName}} 
                  </button>
            </td>
          </tr>
        </table>
      </div>

      <div *ngIf="student">
        <h1>Edit {{ student.firstName }} </h1>
        <form #editStudent="ngForm" (ngSubmit)="updateStudent(editStudent.value)">
          Id: <input type="text" name="id" [(ngModel)]="student.id" readonly/> <br/>
          First Name: 
          <input type="text" name="firstName" [(ngModel)]="student.firstName"/> <br/>
          Last Name: 
          <input type="text" name="lastName" [(ngModel)]="student.lastName"/> <br/>
          Age: 
          <input type="text" name="age" [(ngModel)]="student.age"/> 
            <button (click)="updateAge(student.age)">
              Update Age 
            </button>          
          <br/>
          <input type="submit" value="submit"/>
          </form>
      </div>

        <h1>Add student </h1>
        <form #addStudent="ngForm" (ngSubmit)="saveStudent(addStudent.value)">
          First Name: 
          <input type="text" name="firstName" ngModel/> <br/>
          Last Name: 
          <input type="text" name="lastName" ngModel/> <br/>
          Age: 
          <input type="text" name="age" ngModel/> 
          <br/>
          <input type="submit" value="add student"/>
        </form>
      

  `,
  styles: []
})
export class StudentComponent implements OnInit {
  http: HttpClient;
  students: Student[];
  student: Student;

  constructor(http: HttpClient)
  {
    this.http = http;
    this.readAllStudents();
  }

  ngOnInit() {
  }

  readAllStudents()
  {
    this.http.get<Student[]>('http://localhost:7171/allStudents').subscribe(
      results =>{
        this.students = results;
      }
    );
  }

  readOneStudent(id)
  {
    this.http.get<Student>('http://localhost:7171/oneStudent/' + id).subscribe(
      results =>{
        this.student = results;
      }
    );
  }

  saveStudent(student)
  {
    this.http.post('http://localhost:7171/student', student).subscribe(
      results =>{
        console.log(results);   
        this.readAllStudents();     
      }
    );
  }

  deleteStudent(id)
  {
    this.http.delete('http://localhost:7171/deleteStudent/' + id).subscribe(
      results =>{
        console.log(results);   
        this.readAllStudents();     
      }
    );
  }
  updateStudent()
  {
    this.http.put('http://localhost:7171/updateStudent', this.student).subscribe(
      results =>{
        console.log(results);   
        this.readAllStudents();     
      }
    );
  }

  updateAge(age)
  {
    this.http.patch('http://localhost:7171/updateAge/' + this.student.id, 
                    {'age': age}).subscribe(
      results =>{
        console.log(results);   
        this.readAllStudents();     
      }
    );
  }


}
