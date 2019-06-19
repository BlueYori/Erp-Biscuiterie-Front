import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Order } from 'src/app/service/order-service/order';
import { OrderService } from 'src/app/service/order-service/order.service';
import { OrderAddComponent } from './../../view/order-add/order-add.component';
import { StateService } from 'src/app/service/state-service/state.service';
import { CustomerService } from 'src/app/service/customer-service/customer.service';
import { Customer } from 'src/app/service/customer-service/customer';
import { State } from 'src/app/service/state-service/state';
import { Role } from 'src/app/service/role-service/role';
import { ProductService } from 'src/app/service/product-service/product.service';
import { OrderDetails } from 'src/app/service/orderDetails-service/order-details';
import { Product } from 'src/app/service/product-service/product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  dataSaved = false;
  message = null;

  // Table
  public displayedColumns = ['date', 'customer', 'price', 'state', 'actions'];
  dataSource = new MatTableDataSource<Order>();

  orderPrice = 0;

  constructor(private formbuilder: FormBuilder,
    private stateService: StateService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private productService: ProductService,
    private dialog: MatDialog) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.loadAllOrders();
  }

  openDialog(order: Order = null) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    if (order != null) {
      dialogConfig.data = {
        orderToUpdate: order
      };
    }

    const dialogRef = this.dialog.open(OrderAddComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        this.loadAllOrders();

        if (data != null) {
          this.message = data;
        }
      }
    );
  }

  loadAllOrders() {
    // Double appel dégueu, a revoir
    // this.orderService.getAllOrders().subscribe(
    //   orders => {
    //     this.dataSource.data = orders as Order[];
    //   }
    // );

    forkJoin(this.orderService.getAllOrders(), this.customerService.getAllCustomers(), this.stateService.getAllState(),
    this.productService.getAllProduct() ).subscribe(
      result => {

        const orders: Order[] = result[0];
        const customers: Customer[] = result[1];
        const states: State[] = result[2];
        const products: Product[] = result[3];

        this.dataSource.data = orders.map(order => {
          const customerFind = customers.find(customer => customer.id === order.customerId);
          const stateFind = states.find(state => state.id === order.stateId);
          const orderDetails = order.orderDetails;
          let price = 0;

          for (let i = 0; i < orderDetails.length; i++) {
            const product = products.find(p => p.id === orderDetails[i].productId);
            price += orderDetails[i].quantity * product.price;
          }
          // const productFind = products.find(product => product.id === order.orderDetails.find(od => od.productId === product.id));
          return {
            id: order.id,
            date: new Date(order.date).toString(),
            price: price,
            state: stateFind.name,
            stateId: order.stateId,
            customerId: order.customerId,
            customer: customerFind.name,
            orderDetails: order.orderDetails
          };
        });
      });
  }

  loadOrderToEdit(order: Order) {
      this.message = null;
      this.dataSaved = null;
      //this.openDialog(order);
      console.log(order.orderDetails);
  }

  calculatePriceOrder(order: Order) {
    this.orderPrice = 0;

    this.productService.getAllProduct().subscribe(
      (products) => {
        this.orderPrice = 0;
        for (let i = 0; i < order.orderDetails.length; i++) {
          console.log(order.orderDetails[i]);
          const orderDetail = order.orderDetails[i];
          const product = products.find(p => p.id === order.orderDetails[i].productId);

          this.orderPrice += product.price * orderDetail.quantity;
          console.log(this.orderPrice);
        }

        return Number(this.orderPrice);
      }

    );
    //return this.orderPrice;

  }

  deleteOrder(orderId: number) {
    if (confirm('Voulez-vous vraiment supprimer cette utilisateur ?')) {
      this.orderService.deleteOrder(orderId).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'L\'utilisateur à bien été supprimé';
          this.loadAllOrders();
        }
      );
    }
  }
}
