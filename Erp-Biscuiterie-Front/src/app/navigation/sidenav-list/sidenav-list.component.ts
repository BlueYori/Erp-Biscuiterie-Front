import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  public entitiesLink: any[] = [
    { entity: 'Customer', link: 'customer' },
    { entity: 'Ingredient', link : 'ingredient' },
    { entity: 'Ingredient Disponibility', link : 'ingredientDisponibility' },
    { entity: 'Order', link : 'order' },
    { entity: 'Order Details', link : 'orderDetails' },
    { entity: 'Product', link : 'product' },
    { entity: 'Recipe', link : 'recipe' },
    { entity: 'Reduction', link : 'reduction' },
    { entity: 'Role', link : 'role' },
    { entity: 'State', link : 'state' },
    { entity: 'Type Ingredient', link : 'typeIngredient' },
    { entity: 'User', link : 'user' }
  ];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
