import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { PIZZAS } from "../pizzasList";
import { BasketService } from "../basket.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  counter = 0;

  constructor(
    private basketService: BasketService,
    private modalService: NgbModal
  ) { }

  pizzas = PIZZAS;
  @ViewChild('testModal') testModal: TemplateRef<any>;

  ngOnInit() { }

  open() {
    this.modalService.open(this.testModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  updateList(isIncrementing: boolean) {
    /* You should check if the value is incrementing or not and
    change the value of the counter depending of the value of the boolean
    */
    if (isIncrementing) {
      this.counter++;
    } else {
      this.counter--;
    }
  }

  resetAll() {
    // First, you need to set the value of the total Amount and the number of pizza Ordered to every pizza to 0 (use map)
    // Then, don't forget to also reset the counter
    // Finally, let's call the service to reset the basket. (Be sure that you have called the service inside the constructor !)
    this.pizzas = this.pizzas.map(pizza => {
      pizza.numberOrdered = 0;
      pizza.totalAmountProduct = 0;
      return pizza;
    });
    this.counter = 0;

    this.basketService.resetBasket();
  }

  buyNow() {
    /*
     If the total amount of the basket is greater than 0 and equal or less to 200,
    you can open the modal that contains the pizza choosen
     */
    if (this.counter > 0 && this.counter <= 200)  {
      this.open();
    } else {
      console.error('buyNow, you can not buy this this.counter:= ', this.counter);
    }
  }

  get totalPrice(): number {
    return this.basketService.totalAmount;
  }
}
