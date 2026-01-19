import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiologisteFormComponent } from './biologiste-form.component';

describe('BiologisteFormComponent', () => {
  let component: BiologisteFormComponent;
  let fixture: ComponentFixture<BiologisteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiologisteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiologisteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
