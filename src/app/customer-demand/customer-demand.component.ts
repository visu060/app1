import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer';


@Component({
  selector: 'app-customer-demand',
  template: `
  <div *ngIf="demands; else noDemands">
    <table border='1'>
    <tr>
    <th>Id</th>
    <th>FirstName</th>
    <th>LastName</th>
    <th>Adrress</th>
    <th>Email</th>
    <th>MobileNo</th>
    <th>Price</th>

    </tr>



      <tr *ngFor="let demand of demands">
        <td> <a href="#" (click)="read(demand.id)"> {{ demand.id }} </a> </td>
        <td> {{ demand.firstName }} </td>
        <td> {{ demand.lastName }} </td>
        <td> {{ demand.address }} </td>
        <td> {{ demand.mobile }} </td>
        <td> {{ demand.email }} </td>

         <td> 
          <table>
              <tr>
                <td *ngFor="let demand of customer.demands">
                  {{ demands.orderName }} &nbsp;
                </td>
              </tr>
          </table>
        </td>
        <td> <a href="#" (click)="delete(customer.id)"> delete </a> </td>
      </tr>
    </table>
  </div> <br/>
  <form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
    First Name: <input type="text" formControlName="firstName"/> <br/>
    Last Name: <input type="text" formControlName="lastName"/> <br/>
   Address: <input type="text" formControlName="address"/> <br/>
   Mobile No: <input type="text" formControlName="mobileNo"/> <br/>
   Email: <input type="text" formControlName="email"/> <br/>



    Demand: <input type="text" #orderName> 
    <button (click)="addDemand($event, orderName)">Add New Demand </button>
    <br/>
    Demands:
    <div formArrayName="demands">
      <div *ngFor="let demand of customerForm.get('demands').controls; let i=index">
        <div [formGroupName]="i">              
          <input type="text" formControlName="orderName"> 
          <button (click)="removeDemand($event, i)">remove</button>
        </div>
      </div>
    </div>
    <button (click)="patchData($event)">Update First Name and Demand</button> <br/>
    <input type="submit" value="submit"/> <br/>
    </form>      
  `,
  styles: []
})
export class CustomerDemandComponent implements OnInit {
  customerForm;
  customers: Customer[];
  constructor(private formBuilder: FormBuilder, private http: HttpClient)
  {
    this.customerForm = this.formBuilder.group({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      address: new FormControl(''),
      mobileNo: new FormControl(''),
      email: new FormControl(''),

      demands: this.formBuilder.array([])
    })
  }
  addDemand($event, orderName)
  {
    this.customerForm.get('demands').push(this.formBuilder.group({
      orderName: orderName.value
    }));
    orderName.value = "";
    $event.preventDefault();
    
  }
  removeDemand($event, i)
  {
    this.customerForm.get('demands').removeAt(i);
    $event.preventDefault();
  }

  ngOnInit() {
    this.readAll();
  }
  onSubmit()
  {
    let jsonStr = JSON.stringify(this.customerForm.value);
    alert(jsonStr);
    let jsonObj = JSON.parse(jsonStr);
    this.http.post('http://localhost:8089/save', jsonObj).subscribe(
      results =>
      {
        console.log();     
        this.readAll();   
        this.customerForm.get('demands').clear();
        this.customerForm.reset();
      }

      )
  }
  readAll()
  {
    this.http.get<Customer[]>('http://localhost:8089/readAll').subscribe(
      results =>
      {
        this.customers = results;        
      }
    )
  }
  delete(id)
  {
    this.http.delete('http://localhost:8089/delete/' + id).subscribe(
      results =>
      {
        console.log(results);
        this.readAll();
     }
    )
  }

  read(id)
  {
    this.http.get('http://localhost:8089/read/' + id).subscribe(
      results =>
      {
        let customer = results;
        let jsonStr = JSON.stringify(customer);
        let jsonObj = JSON.parse(jsonStr);
        this.customerForm.patchValue({
          id: jsonObj.id,
          firstName: jsonObj.firstName,
          lastName: jsonObj.lastName,
          address: jsonObj.address,
          mobileNo: jsonObj.mobileNo,
          email: jsonObj.email



        });
        for(let i = 0; i < jsonObj.demands.length; i++)
        {
          this.customerForm.get('demands').push(this.formBuilder.group({
            id: jsonObj.demands[i].id,
            orderName: jsonObj.demands[i].orderName
          }));
        }
      }   
    )
  }

  patchData($event)
  {
   let customerStr = JSON.stringify(this.customerForm.value);
   let customerObj = JSON.parse(customerStr);
   let customer = {
     id: customerObj.id,
     firstName: customerObj.firstName,

     demands: customerObj.demands
   }
   this.http.patch('http://localhost:8089/patch/', customer).subscribe(
     results =>
     {
       console.log(results);
       this.readAll();
     }
   )
   $event.preventDefault();
  }
}