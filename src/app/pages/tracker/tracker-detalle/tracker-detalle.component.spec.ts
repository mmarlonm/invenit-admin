import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerDetalleComponent } from './tracker-detalle.component';

describe('TrackerDetalleComponent', () => {
  let component: TrackerDetalleComponent;
  let fixture: ComponentFixture<TrackerDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
