import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Grupos } from './grupos.component';

describe('Grupos', () => {
  let component: Grupos;
  let fixture: ComponentFixture<Grupos>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Grupos ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Grupos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
