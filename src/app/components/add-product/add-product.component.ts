import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category.model';
import {ProductDTO} from '../../models/product-dto.model';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-add-product',
  standalone: false,

  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  categories: Category[] = [];
  product: ProductDTO = {
    name: '',
    price: 0,
    description: '',
    categoryId: 0,
    supplier: '',
    stock: 0,
  };
  selectedImage: File | null = null;

  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => (this.categories = data));
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  addProduct(): void {
    if (!this.selectedImage) {
      alert('Please select an image!');
      return;
    }

    this.productService.addProduct(this.product).subscribe(
      (savedProduct) => {
        this.uploadImage(savedProduct.id);
      },
      (error) => {
        console.error(error);
        alert('Failed to add product.');
      }
    );
  }

  uploadImage(productId: number): void {
    if (this.selectedImage) {
      this.imageService.uploadImage(productId, this.selectedImage).subscribe(
        () => {
          alert('Product and image added successfully!');
          // Resetăm formularul
          this.product = { name: '', price: 0, description: '', categoryId: 0 };
          this.selectedImage = null;
        },
        (error) => {
          console.error(error);
          alert('Failed to upload image.');
        }
      );
    }
  }
}
