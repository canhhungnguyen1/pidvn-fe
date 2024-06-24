import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeDcProjectComponent } from './ie-dc-project.component';

describe('IeDcProjectComponent', () => {
  let component: IeDcProjectComponent;
  let fixture: ComponentFixture<IeDcProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeDcProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IeDcProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
