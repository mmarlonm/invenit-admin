import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Permisos } from './permisos.component';

describe('Permisos', () => {
  let component: Permisos;
  let fixture: ComponentFixture<Permisos>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Permisos ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Permisos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
