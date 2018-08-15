import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TankManagementComponent } from './tank-management.component';

describe('TankManagementComponent', () => {
  let component: TankManagementComponent;
  let fixture: ComponentFixture<TankManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TankManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TankManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
