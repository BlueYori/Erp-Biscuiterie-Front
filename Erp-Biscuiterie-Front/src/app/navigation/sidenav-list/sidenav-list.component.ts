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
    { entity: 'Clients', link: 'customer', icon: 'people' },
    { entity: 'Ingredients', link : 'ingredient',icon: 'texture' },
    { entity: 'Disponibilité des ingrédients', link : 'ingredientDisponibility',icon: 'texture' },
    { entity: 'Commandes', link : 'order', icon: 'assignment' },
    { entity: 'Détails des commandes', link : 'orderDetails',icon: 'texture' },
    { entity: 'Produits', link : 'product', icon:'local_pizza' },
    { entity: 'Recettes', link : 'recipe', icon:'library_books' },
    { entity: 'Réductions', link : 'reduction', icon:'local_atm' },
    { entity: 'Rôle', link : 'role',icon: 'texture' },
    { entity: 'Etat', link : 'state',icon: 'texture' },
    { entity: 'Type d\'ingrédient', link : 'typeIngredient',icon: 'texture' },
    { entity: 'Utilisateur', link : 'user', icon: 'person' }
  ];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
