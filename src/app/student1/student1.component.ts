import { Component, OnInit } from '@angular/core';


import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Student } from './student1';


@Component({
  selector: 'app-student1',
  template: `
  <h1>{{ actionType }} Student </h1>
  <form [formGroup]="studentForm" (ngSubmit)="create()">

  <input type="hidden" formControlName='id'/>
 
 First Name:<input type="text" formControlName="firstName" />
 <span *ngIf="firstName.touched && firstName.invalid">
 Fill FirstName 
 </span><br/>

  Last Name:<input type="text" formControlName="lastName" />
  <span *ngIf="lastName.touched && lastName.invalid">
 Fill lastName 
 <br/>
 </span><br/>

  gender:
  <ul>
  <li *ngFor="let gender of genders">
  <input type="radio" formControlName="gender" value="{{gender.id}}" />{{gender.name}}
  </li>
  </ul>

  <span *ngIf="gender.touched && gender.invalid">
  Fill gender 
  </span><br/>
 
  Education: <select formControlName="education">
  <option value =''>Pls Select </option>
  <option *ngFor="let education of educations" value ="{{education.id}}"> {{education.name}} </option>
  </select>
  <span *ngIf="education.touched && education.invalid">
  Fill education 
  </span><br/> 
 
 
  <div formGroupName="address">
  <input type= "hidden" formControlName='id'/>

  1. House No:<input type="text" formControlName="houseNo" />
  <span *ngIf="houseNo.touched && houseNo.invalid">
  Fill houseNo 
  </span>&nbsp;&nbsp;
 

  2. Street Name:<input type="text" formControlName="streetName" />
  <span *ngIf="streetName.touched && streetName.invalid">
  Fill streetName 
  </span> &nbsp;&nbsp;
 

  3. City: <input type="text" formControlName="city" />
  <span *ngIf="city.touched && city.invalid">
  Fill city 
  </span>&nbsp;&nbsp;
 

  4. State:<input type="text" formControlName="state" />
  <span *ngIf="state.touched && state.invalid">
  Fill state 
  </span>
 

</div>
  <input type="submit" value="submit"/>
 
</form>

<div *ngIf="students; else noStudents">
        <h1>List of students </h1>

        <table border='2'>
                <tr>
                 <th>  Id      </th>
                  <th> firstName </th>
                  <th> lastName </th>
                  <th> gender </th>
                  <th> education </th>
                  <th> houseNo </th>
                  <th> streetName </th>
                  <th> city </th>
                  <th>state</th>
                </tr>

                <tr *ngFor="let student of students">
                <td> <a href="#" (click)="read(student.id)">{{student.id}} </a> </td>  
                   <td>{{student.firstName}} </td>
                   <td>{{student.lastName}} </td>
                   <td>{{getGenderName(student.gender) }} </td>
                   <td>{{getEducationName(student.education) }} </td>
                   <td>{{student.address.houseNo}} </td>
                   <td>{{student.address.streetName}} </td>
                   <td>{{student.address.city}} </td>
                   <td>{{student.address.state}} </td>
                   <td> <a href="#" (click)="delete(student.id)">Delete {{student.id}} </a> </td> 
                  
                </tr>
          </table>
   </div>
   <ng-template #noStudents>
   No Students
   </ng-template>
 
  `,
  styles: [] 

           
})
export class Student1Component implements OnInit {
  actionType= "Add";
  studentForm: FormGroup;
  genders;
  educations;

  students:Student[];
  student:Student;


  constructor(private http:HttpClient) { 
    this.genders=[{id:1,name:'Male'},{id:2,name:'Female'}];
    this.educations=[{id:1,name:'BE'},{id:2,name:'MCA'},{id:3,name:'BCA'}];
 
    this.studentForm =new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      gender: new FormControl('undefined',Validators.required),
      education: new FormControl('',Validators.required),
      address:new FormGroup({
        id: new FormControl(''),
        houseNo: new FormControl('',Validators.required),
        streetName: new FormControl('',Validators.required),
        city: new FormControl('',Validators.required),
        state: new FormControl('',Validators.required)
      })
    });
  }

  ngOnInit() {
    this.readAllStudent();
  }

  read(id)
  {
    let student: Student;
    this.http.get<Student>('http://localhost:7860/read/'+ id).subscribe(
      results=>{
        student=results;
       var jsonStr=JSON.stringify(student);
       var jsonObj=JSON.parse(jsonStr);
       this.studentForm.setValue(jsonObj);
        
        this.actionType="Edit";
      }
      
    );
  }

  create(){

    if(this.studentForm.get('gender').value =='undefined'){
      this.studentForm.patchValue({gender:''})
      return;
    }
    let jsonStr=JSON.stringify(this.studentForm.value);
    let jsonObj=JSON.parse(jsonStr);
    this.http.post('http://localhost:7860/create',jsonObj).subscribe(
      results =>{
        console.log(results);
      }
    )
  }

  readAllStudent(){
    this.http.get<Student[]>('http://localhost:7860/readAll').subscribe(
     results =>{
        this.students =results;
     }
    );
  }

get firstName(){
    return this.studentForm.get('firstName');
  }

  get lastName(){
    return this.studentForm.get('lastName');
  }

  get gender(){

   return this.studentForm.get('gender');

  }
  get education(){

    return this.studentForm.get('education');
 
 
 
   }
   get houseNo(){

    return this.studentForm.get('address').get('houseNo');
   }
   get streetName(){
    return this.studentForm.get('address').get('streetName');
   }
   get city(){
    return this.studentForm.get('address').get('city');
   }
   get state(){
    return this.studentForm.get('address').get('state');
   }

   getGenderName(id)
   {
   let genderName;
   for (let i = 0; i < this.genders.length; i++)
     {
       if(this.genders[i].id==id)
       {
         genderName=this.genders[i].name;
         break;
       }
     }
     return genderName; 
   }
  
  getEducationName(id)
  {
  let EducationName;
  for (let i = 0; i < this.educations.length; i++)
    {
      if(this.educations[i].id==id)
      {
        EducationName=this.educations[i].name;
        break;
      }
    }
    return EducationName; 
  }

  delete(id)
  {
    this.http.delete('http://localhost:7086/delete/'+id).subscribe(
      results=>{
        console.log(results);
      }
    )
  }





 }