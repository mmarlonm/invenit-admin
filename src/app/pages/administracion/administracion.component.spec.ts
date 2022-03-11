import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Administracion } from './administracion.component';

describe('Administracion', () => {
  let component: Administracion;
  let fixture: ComponentFixture<Administracion>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Administracion ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Administracion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
