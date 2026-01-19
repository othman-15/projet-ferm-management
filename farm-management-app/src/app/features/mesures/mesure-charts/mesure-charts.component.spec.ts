import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesureChartsComponent } from './mesure-charts.component';

describe('MesureChartsComponent', () => {
  let component: MesureChartsComponent;
  let fixture: ComponentFixture<MesureChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesureChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesureChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
