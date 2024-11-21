import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './components/home/home.component';
import {AddCategoryComponent} from './components/add-category/add-category.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './services/product.service';
import {CategoryService} from './services/category.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddCategoryComponent,
    AddProductComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    CategoryService,
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
