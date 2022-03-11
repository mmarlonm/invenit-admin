import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDetalleComponent } from './device-detalle.component';

describe('DeviceDetalleComponent', () => {
  let component: DeviceDetalleComponent;
  let fixture: ComponentFixture<DeviceDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
