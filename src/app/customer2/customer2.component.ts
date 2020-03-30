import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer2',
  template: `
    <h1> Enter CustomeR2 Details </h1>
    <form [formGroup]="customer2Form">
       Id: <input type="text" formControlName="id"/>
       <span *ngIf="customer2Form.get('id').touched && customer2Form.get('id').invalid">
       Id is required one.
       </span> <br/>

       First Name: <input type="text" formControlName="firstName"/>
       <span *ngIf="firstName.touched && firstName.invalid">
       First Name is required one.
       </span> <br/>

       Last Name: <input type="text" formControlName="lastName"/>
       <span *ngIf="lastName.touched && lastName.invalid">
         <span *ngIf="lastName.errors.required">
       Last Name is required one.
       </span>
        <span *ngIf="lastName.errors.minlength">
           Last name should be min 

           {{lastName.errors.minlenth.requiredLength}}

            chars
            
           </span>
       </span> <br/>


       Email: <input type="text" formControlName="email"/>
       <span *ngIf="customer2Form.get('email').touched && customer2Form.get('email').invalid">
       Email is required one.
       </span> <br/>


       Age: <input type="text" formControlName="age"/>
       <span *ngIf="customer2Form.get('age').touched && customer2Form.get('age').invalid">
          Age is required one.
       </span> <br/>
       
       Occupation: <input type="text" formControlName="occupation"/>
       <span *ngIf="customer2Form.get('occupation').touched && customer2Form.get('occupation').invalid">
       occupation is required one.
       </span> <br/>

       Mobile: <input type="text" formControlName="mobile"/>
       <span *ngIf="customer2Form.get('mobile').touched && customer2Form.get('mobile').invalid">
       Mobile is required one.
       </span> <br/>

     
     Address: <input type="text" formControlName="address"/>
       <span *ngIf="customer2Form.get('address').touched && customer2Form.get('address').invalid">
       Address is required one.
       </span> <br/>











       <input type="submit" value="submit"/>


       </form>
       <div *ngIf="customer2; else noCustomer2">
       <h1> List of CustomeR2 </h1>
         <table border='1'>
           <tr *ngFor="let customer2 of customer2s">
             <td>  
             <a href="#" (click)='read(customer2.id)'>
                 edit{{ customer2.id}}</a>
               <td> {{customer2.firstName}} </td>
               <td> {{customer2.lastName}} </td>
               <td> {{customer2.age}} </td>
               <td> {{customer2.email}} </td>
               <td> {{customer2.occupation}} </td>
               <td> {{customer2.mobile}} </td>
               <td> {{customer2.address}} </td>




               <td> 
                 <a href='#' (click)='delete(customer2.id)'>
                   delete {{ customer2.firstName}}
                 </a>
             </td> 
           </tr>
         </table>
       </div>
   
       <ng-template #noCustomer2>
         No Customer2 available
       </ng-template>
   
       <div *ngIf="customer2">
   
       <h1> Edit {{ customer2.firstName }}  </h1>
       <form #editCustomer2="ngForm" (ngSubmit)="update(editCustomer2.value)">
   
       Id: <input type="text" name="id" [(ngModel)]="customer2.id"/> <br>
   
       First Name: <input type="text"  name="firstName" [(ngModel)]="customer2.firstName"/> <br>
       
       Last Name: <input type="text" name="lastName" [(ngModel)]="customer2.lastName"/> <br>
       
       Age: <input type="text" name="age" [(ngModel)]="customer2.age"/> <br>
       
       Email: <input type="text" name="email" [(ngModel)]="customer2.email"/> <br>

       Occupation: <input type="text" name="email" [(ngModel)]="customer2.occupation"/> <br>

       Mobile: <input type="text" name="email" [(ngModel)]="customer2.mobile"/> <br>

       Address: <input type="text" name="email" [(ngModel)]="customer2.address"/> <br>





       
       <input type="submit" value="Add Customer2"/>
       
       <button (click)="updateAge($event, customer2.id, customer2.age)">
       Update only age
       </button> <br>
       <button (click)="updateFirstNameAndAge($event, customer2.id, customer2.firstName, customer2.age)">
       Update only First Name and Age
       </button> <br>
       </form>



    
  `,
  styles: []
})
export class Customer2Component implements OnInit {

  customer2Form;
  constructor() { 
    this.customer2Form = new FormGroup({
      id: new FormControl('', Validators.required),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      age: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])






    })
  }

  ngOnInit() {
  }

  get firstName()
  {
    return this.customer2Form.get('firstName');
  }
  get lastName()
  {
    return this.customer2Form.get('lastName');
  }

  get age()
  {
    return this.customer2Form.get('age');
  }
  
  get mobile()
  {
    return this.customer2Form.get('mobile');
  }


  get occupation()
  {
    return this.customer2Form.get('occupation');
  }

  get address()
  {
    return this.customer2Form.get('address');
  }


}
