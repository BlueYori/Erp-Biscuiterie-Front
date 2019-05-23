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
  message = null;

  // Table
  public displayedColumns = [ 'name', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>();

  constructor(private formbuilder: FormBuilder, private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadAllProducts();
  }

  openDialog(product: Product = null) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    // Si user non null, alors on update cet user -> On passe l'user a UserAddComponent
    if (product != null) {
      console.log(product);
      dialogConfig.data = {
        productToUpdate: product
      };
    }

    const dialogRef = this.dialog.open(ProductAddComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        this.loadAllProducts();

        if (data != null) {
          this.message = data;
        }
      }
    );
  }


  loadAllProducts() {
    // Double appel dégueu, a revoir
    // this.allProducts = this.productService.getAllProduct();
    this.productService.getAllProduct().subscribe(
      products => {
        this.dataSource.data = products as Product[];
        console.log(products);
      }
    );
  }

  loadProductToEdit(product: Product) {
    this.message = null;
    this.dataSaved = null;

    this.openDialog(product);
  }

  deleteProduct(productId: number) {
    if (confirm('Voulez-vous vraiment supprimer ce product ?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Le product à bien été supprimé';
          this.loadAllProducts();
        }
      );
    }
  }

}
