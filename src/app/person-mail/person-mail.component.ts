import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Person } from './person';


@Component({
  selector: 'app-person-mail',
  template: `
  <div *ngIf="persons; else noPersons">
    <table border='1'>
      <tr *ngFor="let person of persons">
        <td> <a href="#" (click)="read(person.id)"> {{ person.id }} </a> </td>
        <td> {{ person.firstName }} </td>
        <td> {{ person.lastName }} </td>
        <td> 
          <table>
              <tr>
                <td *ngFor="let mail of person.mails">
                  {{ mail.username }} &nbsp;
                </td>
              </tr>
          </table>
        </td>
        <td> <a href="#" (click)="delete(person.id)"> delete </a> </td>
      </tr>
    </table>
  </div> <br/>
  <form [formGroup]="personForm" (ngSubmit)="onSubmit()">
    First Name: <input type="text" formControlName="firstName"> <br/>
    Last Name: <input type="text" formControlName="lastName"> <br/>
    Mail: <input type="text" #username> 
    <button (click)="addMail($event, username)">Add New Mail </button>
    <br/>
    Mails:
    <div formArrayName="mails">
      <div *ngFor="let mail of personForm.get('mails').controls; let i=index">
        <div [formGroupName]="i">              
          <input type="text" formControlName="username"> 
          <button (click)="removeMail($event, i)">remove</button>
        </div>
      </div>
    </div>
    <button (click)="patchData($event)">Update First Name and first email</button> <br/>
    <input type="submit" value="submit"/> <br/>
    </form>      
  `,
  styles: []
})
export class PersonMailComponent implements OnInit {
  personForm;
  persons: Person[];
  constructor(private formBuilder: FormBuilder, private http: HttpClient)
  {
    this.personForm = this.formBuilder.group({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      mails: this.formBuilder.array([])
    })
  }
  addMail($event, username)
  {
    this.personForm.get('mails').push(this.formBuilder.group({
      username: username.value
    }));
    username.value = "";
    $event.preventDefault();
    
  }
  removeMail($event, i)
  {
    this.personForm.get('mails').removeAt(i);
    $event.preventDefault();
  }

  ngOnInit() {
    this.readAll();
  }
  onSubmit()
  {
    let jsonStr = JSON.stringify(this.personForm.value);
    alert(jsonStr);
    let jsonObj = JSON.parse(jsonStr);
    this.http.post('http://localhost:7088/save', jsonObj).subscribe(
      results =>
      {
        console.log();     
        this.readAll();   
        this.personForm.get('mails').clear();
        this.personForm.reset();
      }

      )
  }
  readAll()
  {
    this.http.get<Person[]>('http://localhost:7088/readAll').subscribe(
      results =>
      {
        this.persons = results;        
      }
    )
  }
  delete(id)
  {
    this.http.delete('http://localhost:7088/delete/' + id).subscribe(
      results =>
      {
        console.log(results);
        this.readAll();
     }
    )
  }

  read(id)
  {
    this.http.get('http://localhost:7088/read/' + id).subscribe(
      results =>
      {
        let person = results;
        let jsonStr = JSON.stringify(person);
        let jsonObj = JSON.parse(jsonStr);
        this.personForm.patchValue({
          id: jsonObj.id,
          firstName: jsonObj.firstName,
          lastName: jsonObj.lastName
        });
        for(let i = 0; i < jsonObj.mails.length; i++)
        {
          this.personForm.get('mails').push(this.formBuilder.group({
            id: jsonObj.mails[i].id,
            username: jsonObj.mails[i].username
          }));
        }
      }   
    )
  }

  patchData($event)
  {
   let personStr = JSON.stringify(this.personForm.value);
   let personObj = JSON.parse(personStr);
   let person = {
     id: personObj.id,
     firstName: personObj.firstName,
     mails: personObj.mails
   }
   this.http.patch('http://localhost:7088/patch/', person).subscribe(
     results =>
     {
       console.log(results);
       this.readAll();
     }
   )
   $event.preventDefault();
  }
}