import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { Hello1Component } from './hello1/hello1.component';
import { Hello2Component } from './hello2/hello2.component';
import { Hello3Component } from './hello3/hello3.component';
import { Hello4Component } from './hello4/hello4.component';
import { Hello5Component } from './hello5/hello5.component';
import { Hello6Component } from './hello6/hello6.component';
import { Hello7Component } from './hello7/hello7.component';
import { Hello8Component } from './hello8/hello8.component';
import { Hello9Component } from './hello9/hello9.component';
import { HttpClientModule } from '@angular/common/http';
import { Hello10Component } from './hello10/hello10.component';
import { Hello11Component } from './hello11/hello11.component';
import { StudentComponent } from './student/student.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './employee/employee.service';
import { Employee1Component } from './employee/employee1.component';
import { CustomerComponent } from './customer/customer.component';
import { Customer2Component } from './customer2/customer2.component';
import { BookComponent } from './book/book.component';
import { BookService } from './book/book.service';
import { Student1Component } from './student1/student1.component';
import { BookAuthorComponent } from './book-author/book-author.component';
import { PersonMailComponent } from './person-mail/person-mail.component';
import { CustomerDemandComponent } from './customer-demand/customer-demand.component';
import { MyExpComponent } from './my-exp/my-exp.component';
import { PracticeMobileApplicationComponent } from './practice-mobile-application/practice-mobile-application.component';
import { StudentMasterComponent } from './student-master/student-master.component';



@NgModule({
  declarations: [
    AppComponent,
    Hello1Component,
    Hello2Component,
    Hello3Component,
    Hello4Component,
    Hello5Component,
    Hello6Component,
    Hello7Component,
    Hello8Component,
    Hello9Component,
    Hello10Component,
    Hello11Component,
    StudentComponent,
    EmployeeComponent,
    Employee1Component,
    CustomerComponent,
    Customer2Component,
    BookComponent,
    Student1Component,
    BookAuthorComponent,
    PersonMailComponent,
    CustomerDemandComponent,
    MyExpComponent,
    PracticeMobileApplicationComponent,
     StudentMasterComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [EmployeeService,BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
