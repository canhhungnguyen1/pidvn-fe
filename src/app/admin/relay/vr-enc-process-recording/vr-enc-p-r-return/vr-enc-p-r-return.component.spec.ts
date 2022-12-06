import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrEncPRReturnComponent } from './vr-enc-p-r-return.component';

describe('VrEncPRReturnComponent', () => {
  let component: VrEncPRReturnComponent;
  let fixture: ComponentFixture<VrEncPRReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VrEncPRReturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VrEncPRReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
