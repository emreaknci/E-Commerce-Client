import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ProductAdd } from 'src/app/contracts/productAdd';
import { ProductList } from 'src/app/contracts/productList';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  addProduct(
    model: ProductAdd,
    successCallBack?: any,
    errorCallBack?: (errorList: string[]) => void
  ) {
    this.httpClientService.post({ controller: 'products' }, model).subscribe(
      (reponse) => {
        successCallBack();
      },
      (responseError: HttpErrorResponse) => {
        const _error = responseError.error;
        console.log('error', _error);
        if (responseError.error.length >= 1) {
          let errorList: string[] = [];
          for (let i = 0; i < _error.length; i++) {
            errorList.push(_error[i].value[0]);
          }
          errorCallBack?.(errorList);
        }
      }
    );
  }

  async getProductList(
    page: number = 0,
    size: number = 5,
    successCallBack?: any,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalCount: number; list: ProductList[] }> {
    const promiseData: Promise<{ totalCount: number; list: ProductList[] }> =
      this.httpClientService
        .get<{ totalCount: number; list: ProductList[] }>({
          controller: 'products',
          queryString: `page=${page}&size=${size}`,
        })
        .toPromise();
    promiseData
      .then((s) => successCallBack)
      .catch((responseError: HttpErrorResponse) => {
        errorCallBack?.(responseError.message);
      });
    return await promiseData;
  }

  async deleteProduct(id: string) {
    const deleteObservable: Observable<any> =
      this.httpClientService.delete<any>(
        {
          controller: 'products',
        },
        id
      );
    await firstValueFrom(deleteObservable);
  }
}
