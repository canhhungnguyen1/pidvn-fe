import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparePartRequestsComponent } from './spare-part-requests.component';

describe('SparePartRequestsComponent', () => {
  let component: SparePartRequestsComponent;
  let fixture: ComponentFixture<SparePartRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparePartRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparePartRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
