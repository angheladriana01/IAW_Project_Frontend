import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';
import {Category} from '../../models/category.model';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];
  productImages: Map<number, string> = new Map();
  showAllProducts: boolean = true;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => (this.categories = data));
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.loadProductImages();
      this.showAllProducts = true;
    });
  }

  filterProducts(categoryId: number): void {
    this.productService.getProductsByCategory(categoryId).subscribe((data) => {
      this.products = data;
      this.loadProductImages();
      this.showAllProducts = false;
    });
  }

  loadProductImages(): void {
    this.products.forEach((product) => {
      this.imageService.getImageUrl(product.id).subscribe((imageUrl) => {
        this.productImages.set(product.id, imageUrl);
      });
    });
  }
}
