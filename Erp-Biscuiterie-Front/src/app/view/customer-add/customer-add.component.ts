import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { Customer } from 'src/app/service/customer-service/customer';
import { CustomerService } from 'src/app/service/customer-service/customer.service';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerComponent } from 'src/app/model/customer/customer.component';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  dataSaved = false;
  customerForm: FormGroup;
  customerIsUpdate;
  message = null;

  constructor(
    private formbuilder: FormBuilder,
    private customerService: CustomerService,
    private dialogRef: MatDialogRef<CustomerComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.customerForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      departmentName: ['', [Validators.required]],
      directorName: ['', [Validators.required]],
      reductionId: ['', [Validators.required]]
    });
  }

  getErrorEmail() {
    return this.customerForm.get('email').hasError('required') ? 'Ce champ est requis' :
      this.customerForm.get('email').hasError('pattern') ? 'Adresse email non valide' :
        this.customerForm.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
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
          this.message = 'Le client à bien été ajouté';
          this.customerIsUpdate = null;
          this.customerForm.reset();
        }
      );
    } else {
      customer.id = this.customerIsUpdate;
      this.customerService.updateCustomer(customer).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Le client à bien été modifié';
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
          this.message = 'Le client à bien été supprimé';
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

    this.dialogRef.close(this.customerForm.value);
  }

}
