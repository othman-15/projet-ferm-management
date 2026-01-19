import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBiologisteModalComponent } from './assign-biologiste-modal.component';

describe('AssignBiologisteModalComponent', () => {
  let component: AssignBiologisteModalComponent;
  let fixture: ComponentFixture<AssignBiologisteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignBiologisteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignBiologisteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
