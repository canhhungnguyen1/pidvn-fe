import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PihInvReqDetailComponent } from './pih-inv-req-detail.component';

describe('PihInvReqDetailComponent', () => {
  let component: PihInvReqDetailComponent;
  let fixture: ComponentFixture<PihInvReqDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PihInvReqDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PihInvReqDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
