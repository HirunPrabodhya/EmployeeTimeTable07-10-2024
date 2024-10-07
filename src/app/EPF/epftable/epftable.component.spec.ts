import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EPFTableComponent } from './epftable.component';

describe('EPFTableComponent', () => {
  let component: EPFTableComponent;
  let fixture: ComponentFixture<EPFTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EPFTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EPFTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
