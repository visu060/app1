import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello3',
  templateUrl: './hello3.component.html',
  styleUrls: ['./hello3.component.css']
})
export class Hello3Component implements OnInit {
	firstName="shashi";
	age=20;
	weight=77.5;

  constructor() { }

  ngOnInit() {
  }

}
