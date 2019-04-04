import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientDisponibilityComponent } from './ingredient-disponibility.component';

describe('IngredientDisponibilityComponent', () => {
  let component: IngredientDisponibilityComponent;
  let fixture: ComponentFixture<IngredientDisponibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientDisponibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientDisponibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
