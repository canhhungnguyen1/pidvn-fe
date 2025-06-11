import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsliUserAreaComponent } from './psli-user-area.component';

describe('PsliUserAreaComponent', () => {
  let component: PsliUserAreaComponent;
  let fixture: ComponentFixture<PsliUserAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PsliUserAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PsliUserAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
