import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for pipes like 'number'

@Component({
  selector: 'app-product-card',
  standalone: true, // Mark component as standalone
  imports: [CommonModule], // Declare CommonModule here for pipes
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any; // Input property to receive product data

  constructor() { }

  // These methods are just placeholders for visual representation
  onAddToCart(): void {
    alert(`Added "${this.product.name}" to cart!`);
  }

  onEditProduct(): void {
    alert(`Edit "${this.product.name}" button clicked!`);
  }

  onDeleteProduct(): void {
    alert(`Delete "${this.product.name}" button clicked!`);
  }
}