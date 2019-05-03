import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../customer.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';




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
    this.customerForm = this.formBuilder.group({
      'customer_name': [null, Validators.required],
      'customer_adress': [null, Validators.required],
      'customer_phoneNumber': [null, Validators.required],
      'customer_email': [null, Validators.required],
      'customer_directorName': [null, Validators.required],
      'customer_departmentName': [null, Validators.required],
      'customer_reductionId': [null, Validators.required]


    });
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

}
