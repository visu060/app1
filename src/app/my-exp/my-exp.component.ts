import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



class Gender{
  id;
  name;
}
class Skill{
  constructor(public id, public name)
  {

  }
 
}
class Education{
  id;
  name;
}
@Component({
  selector: 'app-my-exp',
  template: 
  `
  
  <form [formGroup] = "myForm" (ngSubmit)="test1()">
  First Name: <input type="text" formControlName="firstName"/> <br/>
  Last  Name: <input type="text" formControlName="lastName"/> <br/>
  

  Gender:
  <label *ngFor="let g1 of genders">
     <input type="radio" formControlName="gender" value="{{g1.id}}"> {{g1.name}}
  </label>
  <br/>
  Skills:
  
  <label formArrayName="skills" *ngFor="let s1 of myForm.controls.skills.controls; let i=index">
       <input type='checkbox' [formControlName]="i"/> {{skills[i].name}} 
  </label>
  <br/>
  Education:
  <select formControlName="education">
    <option *ngFor="let education of educations" value="{{education.id}}">
      {{ education.name }}
    </option>
  </select>
  <input type="submit" value="submit"/>   
</form>
  `,
  styles: []
})
export class MyExpComponent implements OnInit {
  genders = [];
  skills = [];
  educations = [];
  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) 
  {
    this.myForm = formBuilder.group({
      firstName: new FormControl(),
      lastName: new FormControl(),
      gender: new FormControl(),
      skills: new FormArray([]),
      education: new FormControl()
    });
   
  }  
  ngOnInit() { 
    this.http.get<Gender[]>('http://localhost:9092/allGenders').subscribe(
      results =>{
        this.genders = results;
      }
    );
    this.http.get<Education[]>('http://localhost:9092/allEducations').subscribe(
      results =>{
        this.educations = results;
      }
    );    
    this.http.get<Skill[]>('http://localhost:9092/allSkills').subscribe(
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
      alert(selectedSkillIdsArray[i]);
      skillsArray.push({id: selectedSkillIdsArray[i]})
    }
    alert(JSON.stringify(skillsArray));
    this.myForm.value.skills = skillsArray;
    this.myForm.value.gender = {id:this.myForm.value.gender};
    this.myForm.value.education = {id:this.myForm.value.education};
    var jsonStr = JSON.stringify(this.myForm.value);
    var jsonObj = JSON.parse(jsonStr);
    this.http.post('http://localhost:9092/saveCustomer', jsonObj).subscribe(
      r1 =>
      {
        console.log(r1);        
      }
    )
    console.log(this.myForm);
  }
 
}
