import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class BasketService {
  constructor() {}

  totalAmount = 0;
  @Output() update: EventEmitter<number> = new EventEmitter();

  addToTotalAmount(pizzaPrice: number, isIncrementing: boolean) {
    if (isIncrementing) {
      this.totalAmount += pizzaPrice;
    } else {
      this.totalAmount -= pizzaPrice;
    }
    this.update.emit(this.totalAmount);
  }

  resetBasket() {
    // Here, just set the value of the amount to 0
    // Don't forget to emit the amount
    this.totalAmount = 0;
    this.update.emit(this.totalAmount);
  }
}
