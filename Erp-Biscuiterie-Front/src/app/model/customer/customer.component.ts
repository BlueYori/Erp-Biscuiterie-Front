import { CustomerAddComponent } from './../../view/customer-add/customer-add.component';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../../service/customer-service/customer.service';
import { Customer } from './../../service/customer-service/customer';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  displayedColumns: string[] = ['customer_name', 'customer_adress', 'customer_phoneNumber','customer_email', 'customer_directorName', 'customer_departmentName','customer_reductionId' ];

  data: Customer[] = [];
  isLoadingResults = true;

  constructor(private api: CustomerService, private dialog: MatDialog) { }

   ngOnInit() {
    this.api.getCustomers()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
   }

   openDialog() {
     const dialogConfig = new MatDialogConfig();

     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;

     this.dialog.open(CustomerAddComponent, dialogConfig);
   }

}
