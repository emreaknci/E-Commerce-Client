import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { CreateOrder } from './../../contracts/order/createOrder';
import { OrderList } from 'src/app/contracts/order/orderList';
import { SingleOrder } from 'src/app/contracts/order/singleOrder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpCLientService: HttpClientService) {}

  async create(order: CreateOrder): Promise<void> {
    const observable: Observable<any> = this.httpCLientService.post(
      {
        controller: 'orders',
      },
      order
    );

    await firstValueFrom(observable);
  }
  async getAllOrders(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalOrderCount: number; orders: OrderList[] }> {
    const observable: Observable<{
      totalOrderCount: number;
      orders: OrderList[];
    }> = this.httpCLientService.get({
      controller: 'orders',
      queryString: `page=${page}&size=${size}`,
    });

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => successCallBack())
      .catch((error) => errorCallBack(error));

    return await promiseData;
  }

  async getOrderById(
    id: string,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    const observable: Observable<SingleOrder> =
      this.httpCLientService.get<SingleOrder>(
        {
          controller: 'orders',
        },
        id
      );

    const promiseData = firstValueFrom(observable);
    promiseData
      .then((value) => successCallBack())
      .catch((error) => errorCallBack(error));

    return await promiseData;
  }

  async completeOrder(id: string) {
    const observable: Observable<any> = this.httpCLientService.get({
      controller: "orders",
      action: "complete-order"
    }, id);

    await firstValueFrom(observable);
  }
}
