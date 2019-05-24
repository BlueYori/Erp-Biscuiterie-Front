import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { Product } from 'src/app/service/product-service/product';
import { ProductService } from 'src/app/service/product-service/product.service';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProductAddComponent } from 'src/app/view/product-add/product-add.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  dataSaved = false;
  productForm: FormGroup;
  allProducts: Observable<Product[]>;
  productIdUpdate;
  message = null;

  // Table
  public displayedColumns = [ 'name', 'price'];
  dataSource = new MatTableDataSource<Product>();

  constructor(private formbuilder: FormBuilder, private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.productForm = this.formbuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],

    });
    this.loadAllProducts();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ProductAddComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => {
        this.loadAllProducts();
      }
    );
  }


  loadAllProducts() {
    // Double appel dégueu, a revoir
    this.allProducts = this.productService.getAllProduct();
    this.productService.getAllProduct().subscribe(
      products => {
        this.dataSource.data = products as Product[];
        console.log(products);
      }
    );
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
      this.productForm.controls['name'].setValue(product.name);
      this.productForm.controls['price'].setValue(product.price );

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
          this.message = 'Le product à bien été ajouté';
          this.loadAllProducts();
          this.productIdUpdate = null;
          this.productForm.reset();
        }
      );
    } else {
      product.id = this.productIdUpdate;
      this.productService.updateProduct(product).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Le product à bien été modifié';
          this.loadAllProducts();
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
    if (confirm('Voulez-vous vraiment supprimer ce product ?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Le product à bien été supprimé';
          this.loadAllProducts();
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
  }

}
