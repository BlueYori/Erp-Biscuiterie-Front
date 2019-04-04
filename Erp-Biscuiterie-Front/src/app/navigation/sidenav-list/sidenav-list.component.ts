import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  // private baseUrl = 'https://localhost:5001/api/';
  public entitiesLink: any[] = [
    { entity: 'Customer', link: 'customer' },
    { entity: 'Ingredient', link : 'ingredient' },
    { entity: 'IngredientDisponibility', link : 'ingredientDisponibility' },
    { entity: 'Order', link : 'order' },
    { entity: 'OrderDetails', link : 'orderDetails' },
    { entity: 'Product', link : 'product' },
    { entity: 'Recipe', link : 'recipe' },
    { entity: 'Reduction', link : 'reduction' },
    { entity: 'Role', link : 'role' },
    { entity: 'State', link : 'state' },
    { entity: 'TypeIngredient', link : 'typeIngredient' },
    { entity: 'User', link : 'user' }
  ];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    // this.getAllEntities();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  // getAllEntities() {
  //   this.entitiesName.forEach(e => {
  //     this.httpClient.get(this.baseUrl + e).subscribe((res: any[]) => {
  //       console.log(res);
  //       this.entities = res;
  //     });
  //   });
  // }
}
