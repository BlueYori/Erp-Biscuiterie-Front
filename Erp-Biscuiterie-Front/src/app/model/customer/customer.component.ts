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
  customerForm: FormGroup;
  allCustomers: Observable<Customer[]>;
  customerIsUpdate;
  message = null;

  // Table
  public displayedColumns = ['id', 'name', 'address', 'phoneNumber', 'email', 'directorName', 'departmentName', 'reductionId'];
  dataSource = new MatTableDataSource<Customer>();

  constructor(private formbuilder: FormBuilder, private customerService: CustomerService, private dialog: MatDialog) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.customerForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      directorName: ['', [Validators.required]],
      departmentName: ['', [Validators.required]],
      reductionId: ['', [Validators.required]]
    });
    this.loadAllCustomers();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(CustomerAddComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      () => {
        this.loadAllCustomers();
      }
    );
  }

  getErrorEmail() {
    return this.customerForm.get('email').hasError('required') ? 'Ce champ est requis' :
      this.customerForm.get('email').hasError('pattern') ? 'Adresse email non valide' :
        this.customerForm.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  loadAllCustomers() {
    // Double appel dégueu, a revoir
    this.allCustomers = this.customerService.getAllCustomers();
    this.customerService.getAllCustomers().subscribe(
      customers => {
        this.dataSource.data = customers as Customer[];
        console.log (customers);
      }
    );
  }

  onFormSubmit() {
    this.dataSaved = false;
    const customer = this.customerForm.value;
    this.createCustomer(customer);
    this.customerForm.reset();
  }

  loadCustomerToEdit(customerId: number) {
    this.customerService.getCustomerById(customerId).subscribe((customer) => {

      this.message = null;
      this.dataSaved = null;
      this.customerIsUpdate = customer.id;
      this.customerForm.controls['name'].setValue(customer.name);
      this.customerForm.controls['address'].setValue(customer.address);
      this.customerForm.controls['phoneNumber'].setValue(customer.phoneNumber);
      this.customerForm.controls['email'].setValue(customer.email);
      this.customerForm.controls['directorName'].setValue(customer.directorName);
      this.customerForm.controls['departmentName'].setValue(customer.departmentName);
      this.customerForm.controls['reductionId'].setValue(customer.reductionId);

      console.log(this.customerIsUpdate);
    },
    error  => {
    console.log('Error', error);
    });
  }

  createCustomer(customer: Customer) {
    if (this.customerIsUpdate == null) {
      this.customerService.createCustomer(customer).subscribe(
        data => {
          this.dataSaved = true;
          this.message = 'L\'utilisateur à bien été ajouté';
          this.loadAllCustomers();
          this.customerIsUpdate = null;
          this.customerForm.reset();
        }
      );
    } else {
      customer.id = this.customerIsUpdate;
      this.customerService.updateCustomer(customer).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'L\'utilisateur à bien été modifié';
          this.loadAllCustomers();
          this.customerIsUpdate = null;
          this.customerForm.reset();
        },
        error  => {
          console.log('Error', error);
          }
      );
    }
  }

  deleteCustomer(customerId: number) {
    if (confirm('Voulez-vous vraiment supprimer cette utilisateur ?')) {
      this.customerService.deleteCustomer(customerId).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'L\'utilisateur à bien été supprimé';
          this.loadAllCustomers();
          this.customerIsUpdate = null;
          this.customerForm.reset();
        }
      );
    }
  }

  resetForm() {
    this.customerForm.reset();
    this.customerForm.markAsUntouched();
    this.message = null;
    this.dataSaved = false;
  }

}
