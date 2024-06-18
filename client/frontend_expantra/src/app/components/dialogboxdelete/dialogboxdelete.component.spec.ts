import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogboxdeleteComponent } from './dialogboxdelete.component';

describe('DialogboxdeleteComponent', () => {
  let component: DialogboxdeleteComponent;
  let fixture: ComponentFixture<DialogboxdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogboxdeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogboxdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
