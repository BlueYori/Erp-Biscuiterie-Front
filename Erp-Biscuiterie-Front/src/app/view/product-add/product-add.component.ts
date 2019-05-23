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
  productIdUpdate;
  message = null;

  constructor(
    private formbuilder: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

  }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.productForm = this.formbuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
  }


  onFormSubmit() {
    this.dataSaved = false;
    const product = this.productForm.value;
    this.createProduct(product);
    this.productForm.reset();
  }

  loadProductToEdit(productId: number) {
    this.productService.getProductById(productId).subscribe((product) => {

      this.message = null;
      this.dataSaved = null;
      this.productIdUpdate = product.id;
      this.productForm.controls['id'].setValue(product.id);
      this.productForm.controls['name'].setValue(product.name);
      this.productForm.controls['price'].setValue(product.price);


      console.log(this.productIdUpdate);
    },
      error => {
        console.log('Error', error);
      });
  }

  createProduct(product: Product) {
    if (this.productIdUpdate == null) {
      this.productService.createProduct(product).subscribe(
        data => {
          this.dataSaved = true;
          this.message = 'Le produit a bien été ajouté';
          this.productIdUpdate = null;
          this.productForm.reset();
        }
      );
    } else {
      product.id = this.productIdUpdate;
      this.productService.updateProduct(product).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Le produit à bien été modifié';
          this.productIdUpdate = null;
          this.productForm.reset();
        },
        error => {
          console.log('Error', error);
        }
      );
    }
  }

  deleteProduct(productId: number) {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Le produit a bien été supprimé';
          this.productIdUpdate = null;
          this.productForm.reset();
        }
      );
    }
  }

  resetForm() {
    this.productForm.reset();
    this.productForm.markAsUntouched();
    this.message = null;
    this.dataSaved = false;

    this.dialogRef.close(this.productForm.value);
  }

}
