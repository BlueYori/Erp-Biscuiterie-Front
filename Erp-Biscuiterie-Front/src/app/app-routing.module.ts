import { UserComponent } from './model/user/user.component';
import { RoleComponent } from './model/role/role.component';
import { IngredientComponent } from './model/ingredient/ingredient.component';
import { IngredientDisponibilityComponent } from './model/ingredient-disponibility/ingredient-disponibility.component';
import { CustomerComponent } from './model/customer/customer.component';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { OrderComponent } from './model/order/order.component';
import { OrderDetailsComponent } from './model/order-details/order-details.component';
import { ProductComponent } from './model/product/product.component';
import { RecipeComponent } from './model/recipe/recipe.component';
import { ReductionComponent } from './model/reduction/reduction.component';
import { StateComponent } from './model/state/state.component';
import { TypeIngredientComponent } from './model/type-ingredient/type-ingredient.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  { path: '',
   component: HomeComponent },
  { path: 'connexion',
   component: ConnexionComponent },
   { path: 'customer',
   component:  CustomerComponent },
   { path: 'ingredient',
   component: IngredientComponent },
   { path: 'ingredientDisponibility',
   component: IngredientDisponibilityComponent },
   { path: 'order',
   component: OrderComponent },
   { path: 'orderDetails',
   component: OrderDetailsComponent },
   { path: 'product',
   component: ProductComponent },
   { path: 'recipe',
   component: RecipeComponent },
   { path: 'reduction',
   component: ReductionComponent },
   { path: 'role',
   component: RoleComponent },
   { path: 'state',
   component: StateComponent },
   { path: 'typeIngredient',
   component: TypeIngredientComponent },
   { path: 'user',
   component: UserComponent },
  {
    path: 'login',
    component: LoginFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
