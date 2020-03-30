import { HttpClient } from '@angular/common/http';
import { from } from "rxjs";
import { Employee } from './employee';
import { Injectable } from '@angular/core';


@Injectable()
export class EmployeeService
{
    private url = "http://localhost:7081";
    constructor(private http: HttpClient)
    {
        
    }

    create(emp: Employee)
    {
        return this.http.post(this.url + "/saveEmployee", emp);
    }

    readAll()
    {

        return this.http.get<Employee[]>(this.url + "/readAll");
    }


    read(id)
    {

        return this.http.get<Employee>(this.url + "/read/" +id);
    }


    update(emp: Employee)
    {

        return this.http.put(this.url + "/update", emp);
    }

    updateAge(id, age)
    {

        return this.http.patch(this.url + "/updateAge/" +id, {'age': age});
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