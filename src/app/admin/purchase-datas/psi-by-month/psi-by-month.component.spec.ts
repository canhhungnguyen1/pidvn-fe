import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsiByMonthComponent } from './psi-by-month.component';

describe('PsiByMonthComponent', () => {
  let component: PsiByMonthComponent;
  let fixture: ComponentFixture<PsiByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsiByMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsiByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
