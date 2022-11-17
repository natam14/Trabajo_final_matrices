import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeMatrizComponent } from './see-matriz.component';

describe('SeeMatrizComponent', () => {
  let component: SeeMatrizComponent;
  let fixture: ComponentFixture<SeeMatrizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeMatrizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeMatrizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
