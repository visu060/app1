import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-hello9',
  template: `
   <button (click)="saveCustomer()">Add new Customer </button>
  `,
  styles: []
})
export class Hello9Component implements OnInit {

  http:HttpClient;

  constructor(http:HttpClient) {
    this.http=http;
   }

  ngOnInit() {
  }
  saveCustomer(){
    let customer={
      "id":101,
      "firstName":"shashi",
      "lastName":"Btm"
    }
    this.http.post('http://localhost:7075/customer',customer).subscribe(
      results =>{
        console.log("Save results :"+results);
      }
    )

  }

}
