import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { Customer } from '../../customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  displayedColumns: string[] = ['customer_name', 'customer_adress', 'customer_phoneNumber','customer_email', 'customer_directorName', 'customer_departmentName','customer_reductionId' ];

  data: Customer[] = [];
  isLoadingResults = true;

  constructor(private api: CustomerService) { }

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

}
