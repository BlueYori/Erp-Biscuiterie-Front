import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Ingredient } from 'src/app/service/ingredient-service/ingredient';
import { IngredientService } from 'src/app/service/ingredient-service/ingredient.service';
import { IngredientAddComponent } from './../../view/ingredient-add/ingredient-add.component';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  dataSaved = false;
  message = null;

  // Table
  public displayedColumns = ['id', 'name', 'price', 'typeIngredientId', 'actions'];
  dataSource = new MatTableDataSource<Ingredient>();

  constructor(private formbuilder: FormBuilder, private ingredientService: IngredientService, private dialog: MatDialog) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  ngOnInit() {
    this.loadAllIngredients();
  }

  openDialog(ingredient: Ingredient = null) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    if (ingredient != null) {
      console.log(ingredient);
      dialogConfig.data = {
        ingredientToUpdate: ingredient
      };
    }

    const dialogRef = this.dialog.open(IngredientAddComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        this.loadAllIngredients();

        if (data != null) {
          this.message = data;
        }
      }
    );
  }

  loadAllIngredients() {
    this.ingredientService.getAllIngredients().subscribe(
      ingredients => {
        this.dataSource.data = ingredients as Ingredient[];
      }
    );
  }

  loadIngredientToEdit(ingredient: Ingredient) {
      this.message = null;
      this.dataSaved = null;
      this.openDialog(ingredient);
  }

  deleteIngredient(ingredientId: number) {
    if (confirm('Voulez-vous vraiment supprimer cet ingrédient ?')) {
      this.ingredientService.deleteIngredient(ingredientId).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'L\'ingrédient à bien été supprimé';
          this.loadAllIngredients();
        }
      );
    }
  }
}
