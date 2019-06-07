import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Order } from 'src/app/service/order-service/order';
import { OrderService } from 'src/app/service/order-service/order.service';
import { OrderAddComponent } from './../../view/order-add/order-add.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  dataSaved = false;
  message = null;

  // Table
  public displayedColumns = ['id', 'name', 'price', 'actions'];
  dataSource = new MatTableDataSource<Order>();

  constructor(private formbuilder: FormBuilder, private orderService: OrderService, private dialog: MatDialog) { }

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
    this.orderService.getAllOrders().subscribe(
      orders => {
        this.dataSource.data = orders as Order[];
      }
    );
  }

  loadOrderToEdit(order: Order) {
      this.message = null;
      this.dataSaved = null;
      this.openDialog(order);
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
