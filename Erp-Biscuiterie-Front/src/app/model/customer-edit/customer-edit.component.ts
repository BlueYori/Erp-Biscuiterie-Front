import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../customer.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customerForm: FormGroup;
  _id: number ;
  customer_name: string = '';
  customer_adress: string = '';
  customer_phoneNumber: string = '';
  customer_email: string = '';
  customer_directorName: string = '';
  customer_departmentName: string = '';
  customer_reductionId: number;
  isLoadingResults = false;


  constructor(private router: Router, private route: ActivatedRoute, private api: CustomerService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.getCustomer(this.route.snapshot.params['id']);
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

  getCustomer(id) {
    this.api.getCustomer(id).subscribe(data => {
      this._id = data._id;
      this.customerForm.setValue({

        customer_name: data.customer_name,
        customer_adress: data.customer_adress ,
        customer_phoneNumber: data.customer_phoneNumber ,
        customer_email: data.customer_email ,
        customer_directorName: data.customer_directorName ,
        customer_departmentName: data.customer_departmentName,
        customer_reductionId: data.customer_reductionId ,
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateCustomer(this._id, form)
      .subscribe(res => {
        let id = res['_id'];
        this.isLoadingResults = false;
        this.router.navigate(['/customer-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

  customerDetails() {
    this.router.navigate(['/customer-detail', this._id]);
  }


}
