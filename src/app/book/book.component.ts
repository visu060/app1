import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from './book.service';



export class Book
{
  id;
  title;
  author;
}



@Component({
  selector: 'app-book',
  template: `
    
  <h1>{{ actionType}} book</h1>
  <form [formGroup]="bookForm" (ngSubmit)="createOrUpdate()">
    Id: <input type="text" formControlName="id"/>
        <span *ngIf="id.touched && id.invalid"> Id is required one </span> <br/>

     Title: <input type="text" formControlName="title"/>
        <span *ngIf="title.touched && title.invalid"> Title is required one </span> <br/>

     Author: <input type="text" formControlName="author"/>
        <span *ngIf="author.touched && author.invalid"> Author is required one </span> <br/>   

     <input type="submit" value="submit"/>
   </form>     

    <div *ngIf="books; else noBooks">
      <h1> List of Books </h1>
      <table border='1'>
        <tr>
          <th> ID </th>
          <th> Title </th>
          <th> Author </th>
          <th> Delete </th>

        </tr>
        <tr *ngFor="let book of books">
          <td> <a href="#" (click)="read(book.id)"> {{book.id}} </a> </td>
          <td> {{book.title}} </td>
          <td> {{book.author}} </td>
        
          <td> <a href="#" (click)="delete(book.id)"> Delete </a> </td>
        </tr>
       </table>
    </div>

    <ng-template #noBooks> No Books available </ng-template>
    
 `, 
  styles: []
})
export class BookComponent implements OnInit {

  actionType = "Add";
  books:Book[];
  bookForm;


  constructor(private service:BookService) 
  { 
    this.bookForm = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),


    })
  }

  ngOnInit() {

    this.readAllBooks();

  }

  readAllBooks()
  {
    this.service.readAllBooks().subscribe(
      results=> {
        this.books = results;
      }
      )
  }
   
  read(id)
  {
    this.service.read(id).subscribe(
      results => {
        this.bookForm.setValue({'id':results.id, 'title':results.title, 'author': results.author});

          this.actionType = "Edit";

      }
    )

  }
  

  createOrUpdate()
  {
    if(this.bookForm.invalid)
    {
  return;
    }
    var bookStr = JSON.stringify(this.bookForm.value);
    var bookJson = JSON.parse(bookStr);
    this.service.createOrUpdate(bookJson).subscribe(
      results =>{
        console.log(results);
        this.readAllBooks();
      }
    );


  }

  delete(id)
  {
    this.service.delete(id).subscribe(
      results =>{
        console.log(results);
        this.readAllBooks();
      }
    );
  }

  get id()
  {
    return this.bookForm.get('id');
  }

  get title()
  {
    return this.bookForm.get('title');
  }

  get author()
  {
    return this.bookForm.get('author');
  }

}
