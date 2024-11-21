import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AddCategoryComponent} from './components/add-category/add-category.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
