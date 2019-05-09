import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener
} from "@angular/core";
import { PIZZAS } from "../pizzasList";
import { BasketComponent } from "../basket/basket.component";
import { BasketService } from "../basket.service";
import { Pizza } from "../pizza";

@Component({
  selector: "app-pizzalist",
  templateUrl: "./pizzalist.component.html",
  styleUrls: ["./pizzalist.component.css"]
})
export class PizzalistComponent implements OnInit {
  @Input() pizzas: Pizza[];
  @Output() isAdded = new EventEmitter<boolean>();


  constructor(private basketService: BasketService) {}

  ngOnInit() {

  }

  updateList(pizza: Pizza, addedToTotal: boolean) {
    if (addedToTotal) {
      pizza.numberOrdered++;
      pizza.totalAmountProduct += pizza.price;
    } else {
      pizza.numberOrdered--;
      pizza.totalAmountProduct -= pizza.price;
    }
    this.basketService.addToTotalAmount(pizza.price, addedToTotal);
    this.isAdded.emit(addedToTotal);
  }

  decrementNumber(pizza: Pizza) {
    // Decrement the number of the ordered pizza
    // the total amount of the selected pizza should be reduced as well
    // call the update list
    const isIncrement = false;
    this.updateList(pizza, isIncrement);
  }

  incrementNumber(pizza: Pizza) {
    // Increment the number of the ordered pizza
    // the total amount of the selected pizza should be augmented as well
    // call the update list
    const isIncrement = true;
    this.updateList(pizza, isIncrement);
  }
}
