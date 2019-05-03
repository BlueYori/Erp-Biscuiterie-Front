import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../customer.service';
import { Customer } from '../../customer';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customer: Customer = { _id: null, customer_name: '', customer_adress: '', customer_phoneNumber: '', customer_email: '', customer_directorName: '', customer_departmentName: '', customer_reductionId: null , updated_at: null };
  
  
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.getCustomerDetails(this.route.snapshot.params['id']);
  }


  getCustomerDetails(id) {
    this.api.getCustomer(id)
      .subscribe(data => {
        this.customer = data;
        console.log(this.customer);
        this.isLoadingResults = false;
      });
  }

  deleteCustomer(id) {
    this.isLoadingResults = true;
    this.api.deleteCustomer(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/customer']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }


}
