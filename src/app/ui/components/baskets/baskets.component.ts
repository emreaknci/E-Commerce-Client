import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { List_Basket_Item } from 'src/app/contracts/baskets/listBasketItem';
import { Update_Basket_Item } from 'src/app/contracts/baskets/updateBasketItem';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/common/order.service';
import { CreateOrder } from './../../../contracts/order/createOrder';

declare var $: any;
@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss'],
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(
    spinnerService: NgxSpinnerService,
    private basketService: BasketService,
    private orderService: OrderService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    super(spinnerService);
  }

  basketItems: List_Basket_Item[];
  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.BallAtom);
    this.basketItems = await this.basketService.get();
    this.hideSpinner(SpinnerType.BallAtom);
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.BallAtom);
    const basketItemId: string = object.target.attributes['id'].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.BallAtom);
  }

  async removeBasketItem(basketItemId: string) {
    this.showSpinner(SpinnerType.BallAtom);
    await this.basketService.remove(basketItemId);

    var a = $('.' + basketItemId);
    $('.' + basketItemId).fadeOut(500, () =>
      this.hideSpinner(SpinnerType.BallAtom)
    );
  }

  async shoppingComplete() {
    this.showSpinner(SpinnerType.BallAtom);
    const order: CreateOrder =new CreateOrder();
    order.address="Sakarya";
    order.description="sipariş";
    console.log(order)
    await this.orderService.create(order);
    this.hideSpinner(SpinnerType.BallAtom);
    this.toastrService.success("Siparişiniz alınmıştır!")
    this.router.navigate(["/"]);
  }
}
