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
import { DialogService } from 'src/app/services/common/dialog.service';
import {
  BasketItemDeleteState,
  BasketItemRemoveDialogComponent,
} from './../../../dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import {
  ShoppingCompleteDialogComponent,
  ShoppingCompleteState,
} from 'src/app/dialogs/shopping-complete-dialog/shopping-complete-dialog.component';

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
    private router: Router,
    private dialogService: DialogService
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

  removeBasketItem(basketItemId: string) {
    $('#basketModal').modal('hide');
    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallAtom);
        await this.basketService.remove(basketItemId);

        var a = $('.' + basketItemId);
        $('.' + basketItemId).fadeOut(500, () =>
          this.hideSpinner(SpinnerType.BallAtom)
        );
      },
    });
  }

  async shoppingComplete() {
    $('#basketModal').modal('hide');
    if (this.basketItems.length > 0) {
      this.dialogService.openDialog({
        componentType: ShoppingCompleteDialogComponent,
        data: ShoppingCompleteState.Yes,
        afterClosed: async () => {
          this.showSpinner(SpinnerType.BallAtom);
          const order: CreateOrder = new CreateOrder();
          order.address = 'Sakarya';
          order.description = 'sipariş';
          await this.orderService.create(order);
          this.hideSpinner(SpinnerType.BallAtom);
          this.toastrService.success('Siparişiniz alınmıştır!');
          this.router.navigate(['/']);
        },
      });
    } else {
      this.toastrService.info(
        'Alışverişi tamamlamak için önce sepete ürün eklemelisiniz.',
        'Alışveriş Tamamlanamadı!'
      );
    }
  }
}
