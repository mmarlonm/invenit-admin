import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoDetalleComponent } from './grupo-detalle.component';

describe('GrupoDetalleComponent', () => {
  let component: GrupoDetalleComponent;
  let fixture: ComponentFixture<GrupoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
