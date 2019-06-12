import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order-service/order.service';
import { Product } from 'src/app/service/product-service/product';
import { ProductService } from 'src/app/service/product-service/product.service';
import { OrderDetails } from 'src/app/service/orderDetails-service/order-details';
import { Order } from 'src/app/service/order-service/order';
import { CustomerService } from 'src/app/service/customer-service/customer.service';
import { Customer } from 'src/app/service/customer-service/customer';
import { formatDate } from '@angular/common';

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

  // Variables relatives à la commande
  public orderDetails: OrderDetails[] = [];
  public customers: Customer[];
  totalPrice = 0;
  selectedCustomer: string;

  // Message
  message = '';

  // Formulaires
  public leftDisplayedColumns = [ 'name', 'price', 'actions'];
  public rightDisplayedColumns = [ 'name', 'price', 'quantity', 'actions'];
  leftDataSource = new MatTableDataSource<Product>();
  rightDataSource = new MatTableDataSource<Product>();

  constructor(
    private customerService: CustomerService,
    private orderService: OrderService,
    private productService: ProductService) { }

  ngOnInit() {
    this.loadAllOrders();
    this.loadAllCustomers();
  }

  loadAllOrders() {
    this.productService.getAllProduct().subscribe(
      products => {
        this.leftDataSource.data = products as Product[];
      }
    );
  }

  loadAllCustomers() {
    this.customerService.getAllCustomers().subscribe(
      customers => {
        this.customers = customers as Customer[];
      }
    );
  }

  addProductToDataSource(product: Product, index: number) {
    const leftData =  this.leftDataSource.data;
    const rightData =  this.rightDataSource.data;

    this.addProductToOrderDetails(product);

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
    // On remove en dernier de orderDetails pour recalculer le prix total de la commande
    this.removeProductOfOrderDetails(index);

    this.rightDataSource.data = rightData;
    this.leftDataSource.data = leftData;
  }

  addProductToOrderDetails(product: Product) {
    const orderDetails: OrderDetails = new OrderDetails();
    orderDetails.productId = product.id;
    orderDetails.quantity = 1;

    this.orderDetails.push(orderDetails);
    this.totalPrice += product.price;
  }

  removeProductOfOrderDetails(index: number) {
    this.orderDetails.splice(index, 1);

    this.totalPriceOrder();
  }

  changeQuantity(value: string, index: number) {
    this.orderDetails[index].quantity = (value === '') ? 0 : Number(value);

    this.totalPriceOrder();
  }

  totalPriceOrder() {
      // Algo => Si même id du produit est égale à productId de OrderDetails, on calcule
      let price = 0;
      for (let i = 0; i < this.orderDetails.length; i++) {
          if (this.orderDetails[i].productId === this.rightDataSource.data[i].id) {
            price += this.orderDetails[i].quantity * this.rightDataSource.data[i].price;
          }
      }

      this.totalPrice = price;
  }

  validateCommand() {
    if (this.orderDetails.length <= 0) {
      alert('Erreur, la commande ne contient aucun produit');
      return;
    }

    if (this.selectedCustomer === '' || !this.selectedCustomer) {
      alert('Erreur, veuillez choisir un client');
      return;
    }

    const order = new Order();
    const date = formatDate(new Date(), 'yyyy-MM-ddTHH:MM:ss', 'fr-FR');
    order.customerId = Number(this.selectedCustomer);
    order.stateId = 1;
    order.orderDetails = this.orderDetails;
    order.date = date;
    // console.log('on passe commande le ' + date + " " + new Date(Date.parse(date)));
    // console.log(order);
    this.orderService.createOrder(order).subscribe(
      () => {
        this.message = 'La commande a bien été effectué';
      });
  }
}
