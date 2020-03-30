import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello4',
  templateUrl: './hello4.component.html',
  styles: ['p{color:green;font-size:25px}','div{color:blue}'] /*Inline Css */
})
export class Hello4Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
