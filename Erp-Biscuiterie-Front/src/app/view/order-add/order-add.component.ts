import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order-service/order.service';
import { Product } from 'src/app/service/product-service/product';
import { ProductService } from 'src/app/service/product-service/product.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

  // Algo pour pas oublier
  // Quand ajoute produit au panier, on ajoute coté front au tableau de product
  // On ajoute également dans un tableau de orderDetails l'id de ce product et sa quantité
  // (créer fonction pour modifier quantité du produit en fonction de son id)
  // Quand on clique sur passer une commande, on créé un body Order et on y ajoute la collection de orderDetails

  public leftDisplayedColumns = [ 'name', 'price', 'actions'];
  public rightDisplayedColumns = [ 'name', 'price', 'quantity', 'actions'];
  leftDataSource = new MatTableDataSource<Product>();
  rightDataSource = new MatTableDataSource<Product>();

  constructor(private orderService: OrderService, private productService: ProductService) { }

  ngOnInit() {
    this.loadAllOrders();
  }

  loadAllOrders() {
    this.productService.getAllProduct().subscribe(
      products => {
        this.leftDataSource.data = products as Product[];
      }
    );
  }

  addProductToDataSource(product: Product, index: number) {
    const leftData =  this.leftDataSource.data;
    const rightData =  this.rightDataSource.data;

    rightData.push(product);
    leftData.splice(index, 1);
    this.leftDataSource.data = leftData;
    this.rightDataSource.data = rightData;
  }

  cancelProduct(product: Product, index: number) {
    const leftData =  this.leftDataSource.data;
    const rightData =  this.rightDataSource.data;

    rightData.splice(index, 1);
    leftData.push(product);
    this.rightDataSource.data = rightData;
    this.leftDataSource.data = leftData;
  }
}
