import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { CreateOrder } from './../../contracts/order/createOrder';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpCLientService: HttpClientService) { }

  async create(order: CreateOrder): Promise<void> {
    const observable: Observable<any> = this.httpCLientService.post({
      controller: "orders"
    }, order);

    await firstValueFrom(observable);
  }
}