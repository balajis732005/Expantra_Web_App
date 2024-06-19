import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateexpensedialogboxComponent } from './updateexpensedialogbox.component';

describe('UpdateexpensedialogboxComponent', () => {
  let component: UpdateexpensedialogboxComponent;
  let fixture: ComponentFixture<UpdateexpensedialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateexpensedialogboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateexpensedialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
