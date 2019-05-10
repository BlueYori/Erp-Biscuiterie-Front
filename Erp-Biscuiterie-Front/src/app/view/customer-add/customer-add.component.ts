import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CustomerService } from '../../service/customer-service/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  customerForm: FormGroup;
  customer_name: string = '';
  customer_adress: string = '';
  customer_phoneNumber: string = '';
  customer_email: string = '';
  customer_directorName: string = '';
  customer_departmentName: string = '';
  customer_reductionId: number;
  isLoadingResults = false;

  constructor(private router: Router, private api: CustomerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.customerForm = this.formBuilder.group({
      'customer_name': [null, Validators.required],
      'customer_adress': [null, Validators.required],
      'customer_phoneNumber': [null, Validators.required],
      'customer_email': ['', [Validators.required, Validators.pattern(emailregex)]],
      'customer_directorName': [null, Validators.required],
      'customer_departmentName': [null, Validators.required],
      'customer_reductionId': [null, Validators.required]
    });
  }

  getErrorEmail() {
    return this.customerForm.get('customer_email').hasError('required') ? 'Ce champ est requis' :
      this.customerForm.get('customer_email').hasError('pattern') ? 'Adresse email non valide' :
        this.customerForm.get('customer_email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addCustomer(form)
      .subscribe(res => {
        let id = res['_id'];
        this.isLoadingResults = false;
        this.router.navigate(['/customer-detail', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }


  resetForm() {
    this.customerForm.reset();
    this.customerForm.markAsUntouched();
  }


}
