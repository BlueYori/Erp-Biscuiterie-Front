import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Customer } from 'src/app/service/customer-service/customer';
import { CustomerService } from 'src/app/service/customer-service/customer.service';
import { CustomerAddComponent } from './../../view/customer-add/customer-add.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  dataSaved = false;
  message = null;

  // Table
  public displayedColumns = ['id', 'name', 'address', 'phoneNumber', 'email', 'directorName', 'departmentName', 'reductionId', 'actions'];
  dataSource = new MatTableDataSource<Customer>();

  constructor(private formbuilder: FormBuilder, private customerService: CustomerService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadAllCustomers();
  }

  openDialog(customer: Customer = null) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    if (customer != null) {
      dialogConfig.data = {
        customerToUpdate: customer
      };
    }

    const dialogRef = this.dialog.open(CustomerAddComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        this.loadAllCustomers();

        if (data != null) {
          this.message = data;
        }
      }
    );
  }

  loadAllCustomers() {
    // Double appel dégueu, a revoir
    this.customerService.getAllCustomers().subscribe(
      customers => {
        this.dataSource.data = customers as Customer[];
      }
    );
  }

  loadCustomerToEdit(customer: Customer) {
      this.message = null;
      this.dataSaved = null;
      this.openDialog(customer);
  }

  deleteCustomer(customerId: number) {
    if (confirm('Voulez-vous vraiment supprimer cette utilisateur ?')) {
      this.customerService.deleteCustomer(customerId).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'L\'utilisateur à bien été supprimé';
          this.loadAllCustomers();
        }
      );
    }
  }
}
