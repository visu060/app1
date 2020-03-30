import { HttpClient } from '@angular/common/http';
import { from } from "rxjs";
import { Customer2 } from './customer2';
import { Injectable } from '@angular/core';


@Injectable()
export class Customer2Service
{
    private url = "http://localhost:8081";
    constructor(private http: HttpClient)
    {
        
    }

    create(cust: Customer2)
    {
        return this.http.post(this.url + "/saveCustomer", cust);
    }

    readAll()
    {

        return this.http.get<Customer2[]>(this.url + "/readAll");
    }


    read(id)
    {

        return this.http.get<Customer2>(this.url + "/read/" +id);
    }


    update(cust: Customer2)
    {

        return this.http.put(this.url + "/update", cust);
    }

    updateAge(id, age)
    {

        return this.http.patch(this.url + "/updateAge/" +id, {'age': age});
    }

    updateMobile(mobile)
    {

        return this.http.patch(this.url + "/updateMobile/", {'mobile':mobile});
    }

   
    updateFirstNameAndAge(id, firstName, age)
    {

        return this.http.patch(this.url + "/updateFirstNameAndAge/" + id, {'firstName': firstName, 'age': age});
    }



    delete(id)
    {

        return this.http.delete(this.url + "/delete/" +id);
    }



}