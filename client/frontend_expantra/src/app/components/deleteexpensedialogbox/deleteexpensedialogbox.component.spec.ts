import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteexpensedialogboxComponent } from './deleteexpensedialogbox.component';

describe('DeleteexpensedialogboxComponent', () => {
  let component: DeleteexpensedialogboxComponent;
  let fixture: ComponentFixture<DeleteexpensedialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteexpensedialogboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteexpensedialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
