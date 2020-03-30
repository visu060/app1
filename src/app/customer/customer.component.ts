import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  template: `
    <h1> Enter Customer Details </h1>
    <form [formGroup]="customerForm">
       Id: <input type="text" formControlName="id"/>
       <span *ngIf="customerForm.get('id').touched && customerForm.get('id').invalid">
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
       
       Occupation: <input type="text" formControlName="occupation"/>
       <span *ngIf="customerForm.get('occupation').touched && customerForm.get('occupation').invalid">
       occupation is required one.
       </span> <br/>

       Mobile: <input type="text" formControlName="mobile"/>
       <span *ngIf="customerForm.get('mobile').touched && customerForm.get('mobile').invalid">
       Mobile is required one.
       </span> <br/>

     
     Address: <input type="text" formControlName="address"/>
       <span *ngIf="customerForm.get('address').touched && customerForm.get('address').invalid">
       Address is required one.
       </span> <br/>


       <input type="submit" value="submit"/>



    </form>
  `,
  styles: []
})
export class CustomerComponent implements OnInit {

  customerForm;
  constructor() { 
    this.customerForm = new FormGroup({
      id: new FormControl('', Validators.required),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      age: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required]),
      address: new FormControl('', Validators.required)





    })
  }

  ngOnInit() {
  }

  get firstName()
  {
    return this.customerForm.get('firstName');
  }
  get lastName()
  {
    return this.customerForm.get('lastName');
  }

  
}
