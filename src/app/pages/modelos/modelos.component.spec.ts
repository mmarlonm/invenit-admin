import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Modelos } from './modelos.component';

describe('Modelos', () => {
  let component: Modelos;
  let fixture: ComponentFixture<Modelos>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Modelos ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Modelos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
