import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shashi',
  template: `
    <p>
      hello5 works! <br/>
	  marks are :={{marks}}
    </p>
  `,
  styles: ['p{color:green}']
})
export class Hello5Component implements OnInit {
	marks=100;

  constructor() { }

  ngOnInit() {
  }

}
