import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { Product } from 'src/app/service/product-service/product';
import { ProductService } from 'src/app/service/product-service/product.service';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductComponent } from 'src/app/model/product/product.component';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  dataSaved = false;
  productForm: FormGroup;
  productToUpdate: Product;
  productIdUpdate;
  message = null;
  title: String = 'Ajouter un produit';

  constructor(
    private formbuilder: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      if ( data != null && data.productToUpdate != null) {
        this.productToUpdate = data.productToUpdate;
        this.productIdUpdate = data.productToUpdate.id;
      }
  }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    const priceRegex: RegExp = /^[0-9]*\.?[0-9]*$/;
    this.productForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern(priceRegex)]]
    });

    if (this.productToUpdate != null) {
      this.title = 'Modifier un produit';
      this.loadProductToEdit(this.productToUpdate);
    }

  }

  getErrorPrice() {
    return this.productForm.get('price').hasError('required') ? 'Ce champ est requis' :
      this.productForm.get('price').hasError('pattern') ? 'Seulement les chiffres et les "." sont autorisés' : '';
  }

  onFormSubmit() {
    this.dataSaved = false;
    const product = this.productForm.value;
    this.createProduct(product);
  }

  loadProductToEdit(product: Product) {
      this.message = null;
      this.dataSaved = null;
      this.productIdUpdate = product.id;
      this.productForm.controls['name'].setValue(product.name);
      this.productForm.controls['price'].setValue(product.price);
  }

  createProduct(product: Product) {
    if (this.productToUpdate == null) {
      this.productService.createProduct(product).subscribe(
        data => {
          this.dataSaved = true;
          this.message = 'Le produit a bien été ajouté';
          this.closeForm();
        }
      );
    } else {
      product.id = this.productIdUpdate;

      this.productService.updateProduct(product).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Le produit à bien été modifié';
          this.closeForm();
        },
        error => {
          console.log('Error', error);
        }
      );
    }
  }

  resetForm() {
    this.productForm.reset();
    this.productForm.markAsUntouched();
    this.message = null;
    this.dataSaved = false;
    this.productIdUpdate = null;
  }

  closeForm() {
    this.productForm.reset();
    this.productForm.markAsUntouched();
    this.dialogRef.close(this.message);
    this.message = null;
    this.productIdUpdate = null;
    this.dataSaved = false;
  }

}
