import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatSelectModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatIconModule, MatToolbarModule, MatCardModule, MatDialogModule, MatTableModule, MatProgressSpinnerModule, MatMenuModule, MatSidenavModule, MatListModule, MatTabsModule,} from '@angular/material';
import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutModule } from '@angular/cdk/layout';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerComponent } from './model/customer/customer.component';
import { IngredientComponent } from './model/ingredient/ingredient.component';
import { IngredientDisponibilityComponent } from './model/ingredient-disponibility/ingredient-disponibility.component';
import { OrderComponent } from './model/order/order.component';
import { OrderDetailsComponent } from './model/order-details/order-details.component';
import { ProductComponent } from './model/product/product.component';
import { RecipeComponent } from './model/recipe/recipe.component';
import { ReductionComponent } from './model/reduction/reduction.component';
import { RoleComponent } from './model/role/role.component';
import { StateComponent } from './model/state/state.component';
import { TypeIngredientComponent } from './model/type-ingredient/type-ingredient.component';
import { UserComponent } from './model/user/user.component';




@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    CustomerComponent,
    IngredientComponent,
    IngredientDisponibilityComponent,
    OrderComponent,
    OrderDetailsComponent,
    ProductComponent,
    RecipeComponent,
    ReductionComponent,
    RoleComponent,
    StateComponent,
    TypeIngredientComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    MatTabsModule,
    MatSidenavModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSidenavModule
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}



