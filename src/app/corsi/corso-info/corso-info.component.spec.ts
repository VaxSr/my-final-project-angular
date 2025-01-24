import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorsoInfoComponent } from './corso-info.component';

describe('CorsoInfoComponent', () => {
  let component: CorsoInfoComponent;
  let fixture: ComponentFixture<CorsoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorsoInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorsoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
