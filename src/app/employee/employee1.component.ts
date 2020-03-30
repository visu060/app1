import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee1',
  template: `
    <h1> ADD EMPLOYEE </h1>
    <form [formGroup]="empForm" (ngSubmit)="create()">

    Id: <input type="text"  formControlName="id"/>

        <span *ngIf= "empForm.get('id').touched && empForm.get('id').invalid">
                Id is required one.
        </span>

           
        <br>
    
    First Name: <input type="text"  formControlName="firstName"/> 

    <span *ngIf= "empForm.get('firstName').touched && empForm.get('firstName').invalid">
            First Name is required
    </span>
           
      
        <br>
    
    Last Name: <input type="text"  formControlName="lastName"/> 
    <span *ngIf= "empForm.get('lastName').touched && empForm.get('lastName').invalid">
                Last Name is required
</span>
    
          
    <br>
    
    Age: <input type="text"  formControlName="age"/> 
    <span *ngIf= "empForm.get('age').touched && empForm.get('age').invalid">
    Age is required
</span>
         
        <br>
    
    Email: <input  type="text"  formControlName="email"/> 

    <span *ngIf= "empForm.get('email').touched && empForm.get('email').invalid">
    Email is required
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
export class Employee1Component implements OnInit {
    empForm
  
  employees: Employee[];
  employee: Employee;
  constructor(private service: EmployeeService)
   { 

    this.empForm = new FormGroup({
        id: new FormControl('566', Validators.required),
        firstName: new FormControl('abc', Validators.required),
        lastName: new FormControl('', Validators.required),
        age: new FormControl('45', Validators.required),
        email: new FormControl('', Validators.required)

      
    });


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


    create()
    {
      let addEmployee = this.empForm.value;
      if(this.empForm.invalid)
      {
        return;
      }
        let employee = JSON.stringify(this.empForm.value);
        let emp = JSON.parse(employee) ;
       
          this.service.create(emp).subscribe(
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
