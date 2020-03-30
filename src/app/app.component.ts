import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	msg="hello India";
  title = 'app1';
  
  method(){
	  console.log("I am from Method");
  }
}
