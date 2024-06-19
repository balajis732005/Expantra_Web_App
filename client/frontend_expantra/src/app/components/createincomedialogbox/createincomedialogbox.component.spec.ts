import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateincomedialogboxComponent } from './createincomedialogbox.component';

describe('CreateincomedialogboxComponent', () => {
  let component: CreateincomedialogboxComponent;
  let fixture: ComponentFixture<CreateincomedialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateincomedialogboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateincomedialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
