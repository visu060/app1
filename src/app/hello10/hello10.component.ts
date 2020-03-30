import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Component({
  selector: 'app-hello10',
  template: `

  <h1>List All Customers</h1>
  <table *ngIf="customers | async as myCustomers  else empty">
  <tr *ngFor="let customer of myCustomers">
     <td>{{customer.id}}</td>
     <td>{{customer.firstName}}</td>
     <td>{{customer.lastName}}</td>
</tr>

  </table>
<div *ngIf="empty">No Customers</div>
<h1>Add Customer</h1>
   <form #addForm="ngForm" (ngSubmit)="addCustomer(addForm.value)">
   Id: <input type="text" name="id" ngModel/><br/>
   First Name: <input type="text" name="firstName" ngModel /><br/>
   Last Name: <input type="text" name="lastName" ngModel /><br/>
   <input type="submit" value="Add Customer"/>
   </form>
  `,
  styles: []
})
export class Hello10Component implements OnInit {

  customers:Observable<Customer[]>;

  http:HttpClient;

  constructor(http:HttpClient) {
    this.http=http;
    this.readAllCustomers();
   }
   readAllCustomers(){
     this.customers=this.http.get<Customer[]>('http://localhost:7075/readAllCustomers');

   }

  ngOnInit() {
  }
  addCustomer(customerValues){
    let customer ={
      "id":customerValues.id,
      "firstName":customerValues.firstName,
      "lastName":customerValues.lastName
    };
    this.http.post('http://localhost:7075/customer',customer).subscribe(
      custResult =>{
        this.readAllCustomers();
        console.log("Save results :"+custResult);
      }
    )

  }

}
