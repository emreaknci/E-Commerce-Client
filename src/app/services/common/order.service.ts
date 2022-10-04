import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { CreateOrder } from './../../contracts/order/createOrder';
import { OrderList } from 'src/app/contracts/order/orderList';

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
}
