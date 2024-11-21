import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';
import {ProductDTO} from '../models/product-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:8081/api/products';

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(productDTO: ProductDTO): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/${productDTO.categoryId}`, productDTO);
  }

  updateProduct(id: number, updates: Partial<ProductDTO>): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, updates);
  }


}
