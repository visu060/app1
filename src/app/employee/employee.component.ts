import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';

@Component({
  selector: 'app-employee',
  template: `
    <h1> Add Employee </h1>
    <form ngForm #addEmployee="ngForm" (ngSubmit)="create(addEmployee)">

    Id: <input type="text" name="id" ngModel required #id="ngModel" minlength="3"/> 
            <span *ngIf="id.touched && id.invalid">
            <span *ngIf="id.errors.required">
             ID field is required one.
             </span>

             <span *ngIf="id.errors.minlength">
             ID should be min 3 chars
             </span>
          </span>
        
        <br>
    
    First Name: <input type="text" name="firstName" ngModel required #firstName="ngModel"/> 
            <span *ngIf="firstName.touched && firstName.invalid">
              First Name field is required one.
        </span>
      
        <br>
    
    Last Name: <input type="text" name="lastName" required ngModel  #lastName="ngModel"> 
          <span *ngIf="lastName.touched && lastName.invalid">
            Last Name field is required one.
    </span>
    <br>
    
    Age: <input type="text" name="age" ngModel required #age="ngModel"/> 
          <span *ngIf="age.touched && age.invalid">
            Age field is required one.
          </span>
        <br>
    
    Email: <input  required type="text" name="email" ngModel #email="ngModel"/> 
          <span *ngIf="email.touched && email.invalid">
              Email field is required one.
          </span>
    
        <br>    
    
    <input type="submit" value="Add Employee"/>
      </form>
    <div *ngIf="employees; else noEmployees">
    <h1> List of Employees </h1>
      <table border='1'>
        <tr *ngFor="let employee of employees">
          <td>  
          <a href="#" (click)='read(employee.id)'>
              edit{{ employee.id}}</a>
            <td> {{employee.firstName}} </td>
            <td> {{employee.lastName}} </td>
            <td> {{employee.age}} </td>
            <td> {{employee.email}} </td>
            <td> 
              <a href='#' (click)='delete(employee.id)'>
                delete {{ employee.firstName}}
              </a>
          </td> 
        </tr>
      </table>
    </div>

    <ng-template #noEmployees>
      No Employees available
    </ng-template>

    <div *ngIf="employee">

    <h1> Edit {{ employee.firstName }}  </h1>
    <form #editEmployee="ngForm" (ngSubmit)="update(editEmployee.value)">

    Id: <input type="text" name="id" [(ngModel)]="employee.id"/> <br>

    First Name: <input type="text"  name="firstName" [(ngModel)]="employee.firstName"/> <br>
    
    Last Name: <input type="text" name="lastName" [(ngModel)]="employee.lastName"/> <br>
    
    Age: <input type="text" name="age" [(ngModel)]="employee.age"/> <br>
    
    Email: <input type="text" name="email" [(ngModel)]="employee.email"/> <br>
    
    <input type="submit" value="Add Employee"/>
    
    <button (click)="updateAge($event, employee.id, employee.age)">
    Update only age
    </button> <br>
    <button (click)="updateFirstNameAndAge($event, employee.id, employee.firstName, employee.age)">
    Update only First Name and Age
    </button> <br>
    </form>




    </div>



  `,
  styles: []
})
export class EmployeeComponent implements OnInit {
  
  employees: Employee[];
  employee: Employee;
  constructor(private service: EmployeeService)
   { 

   }

  ngOnInit() 
  {
    this.readAll();
  }
  readAll()
  {
  this.service.readAll().subscribe(
    results =>{
      this.employees = results
    }
      );
   
  }
    read(id)
    {
      this.service.read(id).subscribe(
        results =>
        {
          this.employee = results;
        }
      );
      
    }


    create(empForm)
    {
      let addEmployee = empForm.value;
      if(empForm.invalid)
      {
        return;
      }
        let employee      = {
      "id": addEmployee.id,
      "firstName": addEmployee.firstName,
      "lastName": addEmployee.lastName,
      "age": addEmployee.age,
      "email": addEmployee.email
        }
          this.service.create(employee).subscribe(
            results=>
            {
              console.log(results);
              this.readAll();
            }
          );

      }

    delete(id)
    {
        
        this.service.delete(id).subscribe(

        results =>
        {
          console.log(results);  
        this.readAll();
            }
      );
      
    }



    update(editEmployee)
    {
      let employee      = {
        "id": editEmployee.id,
        "firstName": editEmployee.firstName,
        "lastName": editEmployee.lastName,
        "age": editEmployee.age,
        "email": editEmployee.email
      }
      
        this.service.update(employee).subscribe(
          results=>{
            console.log(results);
            this.readAll();
          }
        );
      
    
          }
      updateAge($event, id, age)
      {
        this.service.updateAge(id, age).subscribe(
          results => 
          {
          console.log(results);
          this.readAll();
          }
        );
        $event.preventDefault();
    }

    updateFirstNameAndAge($event, id, firstName, age)
      {
        this.service.updateFirstNameAndAge(id, firstName, age).subscribe(
          results => 
          {
          console.log(results);
          this.readAll();
      }
        );
        $event.preventDefault();

    }

  

  }
