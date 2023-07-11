import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { HomeComponent } from './Components/home/home.component';
import { ShowProductComponent } from './Components/show-product/show-product.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: 'addProduct' , component: AddProductComponent},
  {path: 'showProduct', component: ShowProductComponent},
  {path: 'updateProduct/:id', component: UpdateProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
