import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { HomeComponent } from './Components/home/home.component';
import { ShowProductComponent } from './Components/show-product/show-product.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: 'addProduct' , component: AddProductComponent},
  {path: 'showProduct', component: ShowProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
