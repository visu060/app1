import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hello6Component } from './hello6.component';

describe('Hello6Component', () => {
  let component: Hello6Component;
  let fixture: ComponentFixture<Hello6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hello6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hello6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
