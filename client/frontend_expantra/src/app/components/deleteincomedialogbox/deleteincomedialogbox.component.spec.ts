import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteincomedialogboxComponent } from './deleteincomedialogbox.component';

describe('DeleteincomedialogboxComponent', () => {
  let component: DeleteincomedialogboxComponent;
  let fixture: ComponentFixture<DeleteincomedialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteincomedialogboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteincomedialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
