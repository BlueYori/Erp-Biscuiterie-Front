import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Observable } from 'rxjs';

import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { Product } from 'src/app/service/product-service/product';
import { ProductService } from 'src/app/service/product-service/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSaved = false;
  productForm: FormGroup;
  allProducts: Observable<Product[]>;
  productIdUpdate;
  message = null;

  // Table
  public displayedColumns = [ 'id', 'name', 'price'];
  dataSource = new MatTableDataSource<Product>();

  constructor(private formbuilder: FormBuilder, private productService: ProductService, private router: Router) { }

  ngOnInit() {
     this.productForm = this.formbuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],

    });
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.allProducts = this.productService.getAllProduct();
    this.productService.getAllProduct().subscribe(
      products => {
        this.dataSource.data = products as Product[];
        console.log(products);
      }
    );
  }

 goToPage(pageName: string) {
   this.router.navigate(['/product'])
 }

}
