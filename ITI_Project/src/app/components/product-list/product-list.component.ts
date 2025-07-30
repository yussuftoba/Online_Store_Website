import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for *ngFor, *ngIf
import { FormsModule } from '@angular/forms';   // Import FormsModule here
import { ProductCardComponent } from '../product-card/product-card.component'; // Import ProductCardComponent
import { ProductService } from '../../service/product.service';

interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  rating: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true, // Mark component as standalone
  imports: [CommonModule, FormsModule, ProductCardComponent], // Declare imports here
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[]=[];
  constructor(public service:ProductService){
  }

  
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'All';
  categories: string[] = ['All', 'Electronics', 'Fashion', 'Accessories', 'Home'];

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next:(data:any)=>{
        console.log(data);
        this.products=data;
        this.filteredProducts = [...this.products];
      },
      error:(err:any)=>{
        console.error("Error fetching products:", err);
      },
      complete:()=>{
        console.log('Product data fetched successfully');
      }
    });

    
  }

  onSearch(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.applyCategoryFilter(); // Apply category filter after search
  }

  onCategoryChange(): void {
    this.applyCategoryFilter();
  }

  private applyCategoryFilter(): void {
    if (this.selectedCategory === 'All') {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products.filter(product =>
        (product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
        product.category === this.selectedCategory
      );
    }
  }

  onAddProduct(): void {
    alert('Add Product button clicked! (This would navigate to an Add Product form)');
    // In a real application, you'd use Angular Router:
    // this.router.navigate(['/add-product']);
  }
}