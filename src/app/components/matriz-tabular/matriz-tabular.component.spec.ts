import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizTabularComponent } from './matriz-tabular.component';

describe('MatrizTabularComponent', () => {
  let component: MatrizTabularComponent;
  let fixture: ComponentFixture<MatrizTabularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrizTabularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrizTabularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
