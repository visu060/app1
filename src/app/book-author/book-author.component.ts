import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Book } from './book';


@Component({
  selector: 'app-book-author',
  template: `
  <form [formGroup]="bookForm" (ngSubmit)="save()">

  Title :<input type="text" formControlName ="title" /><br/> 
  price :<input type="text" formControlName ="price" /><br/> 
  
  <div formGroupName="author">

  firstName :<input type="text" formControlName ="firstName" /><br/> 
  lastName :<input type="text" formControlName ="lastName" /><br/> 
  </div>
  <input type="submit" value ="submit" />
  <input type="button" (click)= "refresh()" value="REFRESH"/>
  <input type="button" (click)="patch()" value ="update title and firstName"/>
  </form>


  
<div *ngIf="books; else noBook">
<h1>List of Books </h1>
<table border='1'>
        <tr>
        <th>Id </th>
         <th>Title </th>
         <th>Price </th>
         <th>FirstName</th>
         <th>LastName</th>
        </tr>
        <tr *ngFor="let book of books">
        <td><a href="#" (click)="read(book.id)">{{book.id}} </a> </td>
        <td>{{book.title}}</td>
        <td>{{book.price}}</td>
        <td>{{book.author.firstName}}</td>
        <td>{{book.author.lastName}}</td>
        <td><a href="#" (click)="delete(book.id)">Delete</a> </td>
     </tr>
  </table>
</div>
<ng-template #noBook>
No Book
</ng-template>

  `,
  styles: []
})
export class BookAuthorComponent implements OnInit {
bookForm;
books:Book [];
book:Book;
 constructor(private http:HttpClient) { 
    this.bookForm =new FormGroup({
                  id: new FormControl(''),
                  title: new FormControl(''),
                  price: new FormControl(''),

                  author: new FormGroup({
                    id: new FormControl(''),
                    firstName: new FormControl(''),
                    lastName: new FormControl(''),
                  })
                 })
  }

  ngOnInit() {
    this.readAll();
  }
  save(){
    let jsonStr=JSON.stringify(this.bookForm.value);
    let jsonObj=JSON.parse(jsonStr);
    this.http.post('http://localhost:7087/save',jsonObj).subscribe(
      results =>{
        this.readAll();
        console.log(results);
        this.bookForm.reset();
      }
    )
  }

  readAll(){
    this.http.get<Book []>('http://localhost:7087/readAll').subscribe(
      results =>{
        this.books =results;
        console.log(results);
      }
    )

  }
  read(id) {
    this.http.get<Book>('http://localhost:7087/read/' + id).subscribe(
      results => {
        this.book = results;
        let jsonStr = JSON.stringify(this.book);
        let jsonObj = JSON.parse(jsonStr);
        this.bookForm.setValue(jsonObj);

      }
    )
  }

  delete(id){

    this.http.delete('http://localhost:7087/delete/'+id).subscribe(
 //  this.book_Service.delete(id).subscribe(
     results =>{
       console.log(results);
       this.readAll();
     }
   )

 }
 refresh()
 {
   this.bookForm.reset();
 }
 patch()
  {
   let obj={
     title : this.bookForm.get('title').value,
     
     author:{
       id:this.bookForm.get('author').get('id').value,
       firstName: this.bookForm.get('author').get('firstName').value,
     }
   }
   let id=this.bookForm.get('id').value
  this.http.patch('http://localhost:7087/patch/' + id, obj).subscribe(
    results => {
     
      console.log(results);
      this.readAll();
      this.bookForm.reset();
 })

}
}