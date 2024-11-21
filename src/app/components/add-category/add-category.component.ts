import {Component} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category.model';

@Component({
  selector: 'app-add-category',
  standalone: false,

  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  category: Category = { id: 0, name: '' };

  constructor(private readonly categoryService: CategoryService) {}

  addCategory(): void {
    this.categoryService.addCategory(this.category).subscribe(() => {
      alert('Category added!');
      this.category.name = '';
    });
  }
}
