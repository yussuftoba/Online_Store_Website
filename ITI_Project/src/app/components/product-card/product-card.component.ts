import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for pipes like 'number'
import { RouterLink } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true, // Mark component as standalone
  imports: [CommonModule, RouterLink], // Declare CommonModule here for pipes
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any; // Input property to receive product data
  @Output() deleted = new EventEmitter<number>();

  constructor(public service: ProductService, private cartService: CartService) { }

  // These methods are just placeholders for visual representation
  onAddToCart(): void {
    console.log('Add to cart clicked for product:', this.product);
    this.cartService.addToCart({
      productId: this.product.id,
      name: this.product.name,
      price: this.product.price,
      quantity: 1
    });
  }

  onEditProduct(): void {
    alert(`Edit "${this.product.name}" button clicked!`);
  }

  onDeleteProduct(id: any): void {
    this.service.deleteProduct(id).subscribe({
      next: (data: any) => {
        alert(`Product "${this.product.name}" deleted successfully!`);
        this.deleted.emit(id);  //Tell parent to remove it from the list
      },
      error: err => {
        alert('Error deleting product: ' + err.message);
      }
    });
  }
}
