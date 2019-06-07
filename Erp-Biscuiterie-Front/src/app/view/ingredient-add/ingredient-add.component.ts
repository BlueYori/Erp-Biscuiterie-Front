import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { Ingredient } from 'src/app/service/ingredient-service/ingredient';
import { IngredientService } from 'src/app/service/ingredient-service/ingredient.service';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IngredientComponent } from 'src/app/model/ingredient/ingredient.component';

@Component({
  selector: 'app-ingredient-add',
  templateUrl: './ingredient-add.component.html',
  styleUrls: ['./ingredient-add.component.css']
})
export class IngredientAddComponent implements OnInit {

  dataSaved = false;
  ingredientForm: FormGroup;
  message = null;
  title: String = 'Ajouter un ingrédient';
  ingredientToUpdate: Ingredient;
  ingredientIdUpdate;

  constructor(
    private formbuilder: FormBuilder,
    private ingredientService: IngredientService,
    private dialogRef: MatDialogRef<IngredientComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      console.log(data);
      if (data != null && data.ingredientToUpdate != null) {
        this.ingredientToUpdate = data.ingredientToUpdate;
        this.ingredientIdUpdate = data.ingredientToUpdate.id;
      }
    }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    const priceRegex: RegExp = /^[0-9]*\.?[0-9]*$/;
    this.ingredientForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern(priceRegex)]],
      typeIngredientId: ['', [Validators.required]],
    });

    if (this.ingredientToUpdate != null) {
      this.title = 'Modifier un ingrédient';
      this.loadIngredientToEdit(this.ingredientToUpdate);
    }
  }

  getErrorPrice() {
    return this.ingredientForm.get('price').hasError('required') ? 'Ce champ est requis' :
      this.ingredientForm.get('price').hasError('pattern') ? 'Seulement les chiffres et les "." sont autorisés' : '';
  }

  onFormSubmit() {
    this.dataSaved = false;
    const ingredient = this.ingredientForm.value;
    this.createIngredient(ingredient);
  }

  loadIngredientToEdit(ingredient: Ingredient) {
      this.message = null;
      this.dataSaved = null;

      this.ingredientForm.controls['name'].setValue(ingredient.name);
      this.ingredientForm.controls['price'].setValue(ingredient.price);
      this.ingredientForm.controls['typeIngredientId'].setValue(ingredient.typeIngredientId);
  }

  createIngredient(ingredient: Ingredient) {
    if (this.ingredientIdUpdate == null) {
      this.ingredientService.createIngredient(ingredient).subscribe(
        data => {
          this.dataSaved = true;
          this.message = 'L\'ingrédient à bien été ajouté';
          this.closeForm();
        }
      );
    } else {
      ingredient.id = this.ingredientIdUpdate;

      this.ingredientService.updateIngredient(ingredient).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'L\'ingrédient à bien été modifié';
          this.closeForm();
        },
        error  => {
          console.log('Error', error);
          }
      );
    }
  }

  resetForm() {
    this.ingredientForm.reset();
    this.ingredientForm.markAsUntouched();
    this.message = null;
    this.ingredientIdUpdate = null;
    this.dataSaved = false;
  }

  closeForm() {
    this.ingredientForm.reset();
    this.ingredientForm.markAsUntouched();
    this.dialogRef.close(this.message);
    this.message = null;
    this.ingredientIdUpdate = null;
    this.dataSaved = false;
  }

}
