import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface CartItem {
  id?: number;              // Unique identifier for the cart item
  productId: number;        // Product ID
  name: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<CartItem[]>(this.apiUrl);
  }

  addToCart(cartItem: any) {
    this.getAll().subscribe(items => {
      const existingItem = items.find(i => i.productId === cartItem.productId);
      if (existingItem) {
        return this.updateQuantity(existingItem.id!, existingItem.quantity + 1).subscribe();
      } else {
        const item: CartItem = {
          productId: cartItem.productId,
          name: cartItem.name,
          price: cartItem.price,
          quantity: 1
        };

        return this.http.post<CartItem>(this.apiUrl, item).subscribe();
      }
    });
  }

  updateQuantity(itemId: number, quantity: number) {
    return this.http.patch(`${this.apiUrl}/${itemId}`, { quantity });
  }


  removeFromCart(itemId: number) {
    return this.http.delete(`${this.apiUrl}/${itemId}`);
  }

  clearCart() {
    // Get all items first, then delete each
    this.http.get<CartItem[]>(this.apiUrl).subscribe(items => {
      items.forEach(item => {
        this.removeFromCart(item.id!).subscribe();
      });
    });
  }
}
