import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmministrazioneComponent } from './amministrazione.component';

describe('AmministrazioneComponent', () => {
  let component: AmministrazioneComponent;
  let fixture: ComponentFixture<AmministrazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmministrazioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmministrazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
