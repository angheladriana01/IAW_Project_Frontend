import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {ImageService} from '../../services/image.service';
import {Product} from '../../models/product.model';
import {ProductDTO} from '../../models/product-dto.model';
import {Category} from '../../models/category.model';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-product-details',
  standalone: false,

  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  categories: Category[] = [];
  imageUrl: string = '';
  updates: Partial<ProductDTO> = {};

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly imageService: ImageService,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProductDetails(+productId);
    }

    this.loadCategories();
  }

  loadProductDetails(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (data) => {
        console.log('Product data:', data);
        this.product = data;

        // Setează imaginea produsului
        if (this.product.image) {
          this.imageUrl = `data:image/jpeg;base64,${this.product.image}`;
        }
      },
      (error) => {
        console.error('Error loading product details:', error);
      }
    );
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        console.log('Categories data:', data);
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.updates.image = file;
    }
  }

  updateProduct(): void {
    if (!this.product || !this.product.id) {
      alert('No product found to update!');
      return;
    }

    const updatesToSend = { ...this.updates };

    if ('image' in updatesToSend && updatesToSend.image instanceof File) {
      delete updatesToSend.image;
    }

    // Trimitem cererea PATCH pentru actualizare parțială
    this.productService.updateProduct(this.product.id, updatesToSend).subscribe(
      (updatedProduct) => {
        this.product = updatedProduct;
        alert('Product updated successfully!');
        this.updates = {};
      },
      (error) => {
        console.error('Error updating product:', error);
        alert('Failed to update product.');
      }
    );
  }

  uploadImage(): void {
    if (!this.product || !this.product.id || !this.updates.image) {
      alert('No image to upload!');
      return;
    }

    if (this.updates.image instanceof File) {
      this.imageService.uploadImage(this.product.id, this.updates.image).subscribe(
        () => {
          alert('Image updated successfully!');
        },
        (error) => {
          console.error('Error updating image:', error);
          alert('Failed to update image.');
        }
      );
    } else {
      alert('Invalid image format!');
    }
  }
}
