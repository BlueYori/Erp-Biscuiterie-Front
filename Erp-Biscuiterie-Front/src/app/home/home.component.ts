import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Observable } from 'rxjs';

import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { Product } from 'src/app/service/product-service/product';
import { ProductService } from 'src/app/service/product-service/product.service';
import { Router } from '@angular/router';
import { Order } from '../service/order-service/order';
import { OrderService } from '../service/order-service/order.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSavedOrder = false;
  messageOrder = null;

  // Table
  public displayedColumnsOrder = ['idClient', 'nameClient', 'stateId'];
  dataSourceOrder = new MatTableDataSource<Order>();


  // Table
  public displayedColumns = [ 'id', 'name', 'price'];
  dataSource = new MatTableDataSource<Product>();

  constructor(private formbuilder: FormBuilder, private productService: ProductService,
    private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.loadAllProducts();
    this.loadAllOrders();
  }

  loadAllProducts() {
    this.productService.getAllProduct().subscribe(
      products => {
        this.dataSource.data = products as Product[];
      }
    );
  }

  loadAllOrders() {
    this.orderService.getAllOrders().subscribe(
      orders => {
        this.dataSourceOrder.data = orders as Order[];
      }
    );
  }

 goToPage(pageName: string) {
   this.router.navigate(['/product'])
 }

}
