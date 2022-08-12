import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  addToCart(cartItem: CartItem) {
    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      existingCartItem = this.cartItems.find(
        (item) => item.id === cartItem.id
      )!;

      // check if the item exists in the cart
      alreadyExistsInCart = existingCartItem != undefined;
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(cartItem);
    }

    // compute cart total price and total quantity
    this.calculateCartTotal();
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.remove(cartItem);
    } else {
      this.calculateCartTotal();
    }
  }

  remove(cartItem: CartItem) {
    // get index of the item in the array
    const itemIndex = this.cartItems.findIndex(
      (item) => item.id === cartItem.id
    );

    // if found, remove the item from the array
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.calculateCartTotal();
    }
  }

  calculateCartTotal() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (const currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart: ');

    for (const item of this.cartItems) {
      const subTotalPrice = item.quantity * item.unitPrice;
      console.log(
        `name=${item.name}, quantity=${item.quantity}, unitPrice=${item.unitPrice}, subTotalPrice=${subTotalPrice}`
      );
    }

    console.log(
      `totalPrice=${totalPriceValue.toFixed(
        2
      )}, totalQuanity=${totalQuantityValue}`
    );
    console.log('---------');
  }
}
