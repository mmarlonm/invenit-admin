import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimestampParserComponent } from './timestamp-parser.component';

describe('TimestampParserComponent', () => {
  let component: TimestampParserComponent;
  let fixture: ComponentFixture<TimestampParserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimestampParserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimestampParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
