import { Injectable } from '@angular/core';
import { ProductAdd } from 'src/app/contracts/productAdd';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  addProduct(model: ProductAdd,successCallBack?:any) {
    this.httpClientService
      .post({ controller: 'products' }, model)
      .subscribe((reponse) => {
        successCallBack();
      });
  }
}
