import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeIngredientComponent } from './type-ingredient.component';

describe('TypeIngredientComponent', () => {
  let component: TypeIngredientComponent;
  let fixture: ComponentFixture<TypeIngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeIngredientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
