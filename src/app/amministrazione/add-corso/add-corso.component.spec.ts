import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCorsoComponent } from './add-corso.component';

describe('AddCorsoComponent', () => {
  let component: AddCorsoComponent;
  let fixture: ComponentFixture<AddCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCorsoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
