import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsmDetalleComponent } from './gsm-detalle.component';

describe('GsmDetalleComponent', () => {
  let component: GsmDetalleComponent;
  let fixture: ComponentFixture<GsmDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsmDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsmDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
