
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TankManagementComponent } from './tank-management.component';

describe('TankManagementComponent', () => {
  let component: TankManagementComponent;
  let fixture: ComponentFixture<TankManagementComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TankManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TankManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
