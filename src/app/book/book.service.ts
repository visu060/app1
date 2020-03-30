import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book.component';

@Injectable()
export class BookService
{
    private url='http://localhost:7085';
    constructor(private http:HttpClient)
    {
        this.http=http;
    }
    readAllBooks()
    {
        return this.http.get<Book[]>(this.url + '/readAllBooks');
    }
    read(id)
    {
        return this.http.get<Book>(this.url +'/read/' +id);
        
    }
    delete(id)
    {
        return this.http.delete(this.url +'/delete/' +id);
        
    }
    createOrUpdate(book)
    {
        return this.http.post(this.url +'/createOrUpdate/', book);
        
    }

    

}