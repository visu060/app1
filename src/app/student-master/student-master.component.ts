import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



class Gender{
  id;
  name;
}
class Skill{
  id;
  name
 
}
class Education{
  id;
  name;
}
class Address
{
  id;
  houseNo;
  streetName;
  city;
  state;
  country;
}
class Student
{
  id;
  firstName;
  lastName;
  age;
  email;
  gender: Gender;
  education: Education;
  skills: Skill[];
  address: Address;
} 
@Component({
  selector: 'app-student-master',
  template: 
  `
  <div *ngIf="students; else noStudents">
    <table border="1">
      <tr *ngFor="let student of students">
      <td><a href="#" (click)="read(student.id)"> {{student.id}} </a></td>
        <td>{{student.firstName}} </td>
        <td>{{student.lastName}} </td>
        <td>{{student.age}} </td>
        <td>{{student.email}} </td>
        
        <td><a href="#" (click)="delete(student.id)"> delete </a></td>
      </tr>
    </table>
  </div>
  <form [formGroup] = "myForm" (ngSubmit)="test1()">
  First Name: <input type="text" formControlName="firstName"/> <br/>
  Last  Name: <input type="text" formControlName="lastName"/> <br/>
  Age: <input type="text" formControlName="age"/> <br/>
  Mail: <input type="text" formControlName="email"/> <br/>
  <div formGroupName="address">
  House no: <input type="text" formControlName="houseNo"/> <br/>
  Street Name: <input type="text" formControlName="streetName"/> <br/>
  City: <input type="text" formControlName="city"/> <br/>
  State: <input type="text" formControlName="state"/> <br/>
  Country: <input type="text" formControlName="country"/> <br/>
  </div>
  <div formGroupName="gender">
    Gender:
    <label *ngFor="let g1 of genders">
      <input type="radio" formControlName="id" value="{{g1.id}}" 
             [checked] = "getGenderValue() == g1.id"> {{g1.name}}
    </label>
  </div>
  Skills:
  <label formArrayName="skills" *ngFor="let s1 of myForm.controls.skills.controls; let i=index">
       <input type='checkbox' [formControlName]="i"/> {{skills[i].name}} 
  </label>
  <div formGroupName="education">
    Education:
    <select formControlName="id">
      <option *ngFor="let education of educations" 
              value="{{education.id}}" [selected]="getEducationValue() == education.id">
        {{ education.name }}
      </option>
    </select>
  </div>
  <input type="submit" value="submit"/>   
</form>
  `,
  styles: []
})
export class StudentMasterComponent implements OnInit {
  genders = [];
  skills = [];
  educations = [];
  myForm: FormGroup;
  students = [];
  student;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) 
  {
    this.myForm = formBuilder.group({
      id: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      age: new FormControl(),
      email: new FormControl(),
      address: formBuilder.group({
       id: new FormControl(''),
       houseNo: new FormControl(''),
        streetName: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        country: new FormControl('')
      }),
      gender: formBuilder.group({
                id: new FormControl('')
              }),
      skills: new FormArray([]),
      education: formBuilder.group({
        id: new FormControl('')
      })
    });
    this.readAll();
   
  }  
  getGenderValue()
  {
    return JSON.stringify(this.myForm.get('gender').get('id').value);
  }

  getEducationValue()
  {
    return JSON.stringify(this.myForm.get('education').get('id').value);
  }
  ngOnInit() { 
    this.http.get<Gender[]>('http://localhost:9291/allGenders').subscribe(
      results =>{
        this.genders = results;
      }
    );
    this.http.get<Education[]>('http://localhost:9291/allEducations').subscribe(
      results =>{
        this.educations = results;
      }
    );    
    this.http.get<Skill[]>('http://localhost:9291/allSkills').subscribe(
      results =>{
        this.skills = results;
        this.populate();
      }
    );        
  }

  populate()
  {
     for(let i = 0; i < this.skills.length; i++)
    {
      (this.myForm.get('skills') as FormArray).push(new FormControl());
    }
  }
  
  test1()
  {
    var selectedSkillIds = this.myForm.value.skills
    .map((v, i) => v ? this.skills[i].id : null).filter(v => v !== null);
    var selectedSkillIdsArray = selectedSkillIds.toString().split(',');
    var skillsArray = [];
    for(var i = 0; i < selectedSkillIdsArray.length; i++)
    {
      skillsArray.push({id: selectedSkillIdsArray[i]})
    }
    this.myForm.value.skills = skillsArray;
    var jsonStr = JSON.stringify(this.myForm.value);
    var jsonObj = JSON.parse(jsonStr);
    this.http.post('http://localhost:9291/saveStudent', jsonObj).subscribe(
      r1 =>
      {
        console.log(r1);   
        this.readAll();     
      }
    )
    console.log(this.myForm);
    this.myForm.reset();
  }
  readAll()
  {
    this.http.get<Student[]>('http://localhost:9291/readAll').subscribe(
      r1 =>
      {
        this.students = r1;
      }
    )    
  }

  
  delete(id)
  {
    this.http.delete('http://localhost:9291/delete/' + id).subscribe(
      r1 =>
      {
        alert(r1);
        this.readAll();
      }
    )    
  }
 

  read(id)
  {
    this.http.get<Student>('http://localhost:9291/read/' + id).subscribe(
      r1 =>
      {
        var jsonStr = JSON.stringify(r1);
        var jsonObj = JSON.parse(jsonStr);
        this.myForm.get('id').setValue(jsonObj.id);
        this.myForm.get('firstName').setValue(jsonObj.firstName);
        this.myForm.get('lastName').setValue(jsonObj.lastName);
        this.myForm.get('age').setValue(jsonObj.age);
        this.myForm.get('email').setValue(jsonObj.email);
        this.myForm.get('address').get('id').setValue(jsonObj.address.id);
        this.myForm.get('address').get('houseNo').setValue(jsonObj.address.houseNo);
        this.myForm.get('address').get('streetName').setValue(jsonObj.address.streetName);
        this.myForm.get('address').get('city').setValue(jsonObj.address.city);
        this.myForm.get('address').get('state').setValue(jsonObj.address.state);
        this.myForm.get('address').get('country').setValue(jsonObj.address.country);
        this.myForm.get('gender').get('id').setValue(jsonObj.gender.id);
        this.myForm.get('education').get('id').setValue(jsonObj.education.id);
        (this.myForm.get('skills') as FormArray).clear();
        var flag = false;
        for(let i = 0; i < this.skills.length; i++)
        {
          flag = this.skillAvailability(jsonObj.skills, this.skills[i].id);
          (this.myForm.get('skills') as FormArray).push(new FormControl(flag));
        }
      }
    )

  }







  skillAvailability(skills, id)
  {
    var booleanTest = false;
    for(var k = 0; k < skills.length; k++)
    {
      if(skills[k].id == id)
      {
        booleanTest = true;
        break;
      }
    }
    return booleanTest;
  }

 
}