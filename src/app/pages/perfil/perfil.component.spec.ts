import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Perfil } from './perfil.component';

describe('Perfil', () => {
  let component: Perfil;
  let fixture: ComponentFixture<Perfil>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Perfil ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Perfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
