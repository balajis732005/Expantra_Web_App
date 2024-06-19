import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateincomedialogboxComponent } from './updateincomedialogbox.component';

describe('UpdateincomedialogboxComponent', () => {
  let component: UpdateincomedialogboxComponent;
  let fixture: ComponentFixture<UpdateincomedialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateincomedialogboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateincomedialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
