import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateexpensedialogboxComponent } from './createexpensedialogbox.component';

describe('CreateexpensedialogboxComponent', () => {
  let component: CreateexpensedialogboxComponent;
  let fixture: ComponentFixture<CreateexpensedialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateexpensedialogboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateexpensedialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
