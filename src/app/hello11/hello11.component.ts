import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../hello10/customer';

@Component({
  selector: 'app-hello11',
  template: `

  <h1>List All Customers</h1>
  <table *ngIf="customers">
  <tr *ngFor="let customer of customers">
     <td>
      <a href="#" (click)="readOneRecord(customer.id)">
     {{customer.id}}
     </a>
     </td>
     <td>{{customer.firstName}}</td>
     <td>{{customer.lastName}}</td>
     <td> <button (click)="deleteOneRecord(customer.id)">Delete</button> </td>
</tr>

  </table>
<div *ngIf="empty">No Customers </div>
<div *ngIf="customer">
  <h1>Edit Customer</h1>

  <form #editForm="ngForm" (ngSubmit)="updateCustomer(editForm.value)">
   Id: 
   <input type="text" name="id" [(ngModel)] ="customer.id" readonly/> <br/>
   First Name: 
   <input type="text" name="firstName" [(ngModel)]="customer.firstName" /> 
   <button (click)="updateFirstName()">
   update First Name
   </button>
   <br/>
  
   Last Name: 
   <input type="text" name="lastName" [(ngModel)]="customer.lastName" /> <br/>
   <input type="submit" value="Update Customer"/>
   </form>

   

  
</div>


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
export class Hello11Component implements OnInit {

  customers:Customer[];
  customer: Customer;

  http:HttpClient;

  constructor(http:HttpClient) {
    this.http=http;
    this.readAllCustomers();
   }
   readAllCustomers(){
     this.http.get<Customer[]>('http://localhost:7075/readAllCustomers').subscribe(
     results =>{
       this.customers = results;
     }
     )
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
  readOneRecord(id)
  {
    this.http.get<Customer>('http://localhost:7075/readOneCustomers/' +id).subscribe(
           results =>{
            this.customer = results;
            
          }
    )
  }

  deleteOneRecord(id)
  {
    this.http.delete('http://localhost:7075/deleteOneCustomers/' +id).subscribe(
      returnValue=>{
console.log(returnValue);
this.readAllCustomers(); 

}
    )
}

updateCustomer()
{
  this.http.put('http://localhost:7075/updateOneCustomers', this.customer).subscribe(
    results =>{
      console.log("done");
     this.readAllCustomers();
    

}
  );
}

updateFirstName()
{
  this.http.patch('http://localhost:7075/updateFirstNameInCustomers/' + this.customer.id,
                    {'firstName': this.customer.firstName}).subscribe(
    results =>{
      console.log("done");
     this.readAllCustomers();

}
  );
}

  
}