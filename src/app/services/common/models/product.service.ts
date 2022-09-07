import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, observable, Observable } from 'rxjs';
import { ProductAdd } from 'src/app/contracts/productAdd';
import { ProductImage } from 'src/app/contracts/productImage';
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
  ): Promise<{ totalProductCount: number; products: ProductList[] }> {
    const promiseData: Promise<{ totalProductCount: number; products: ProductList[] }> =
      this.httpClientService
        .get<{ totalProductCount: number; products: ProductList[] }>({
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

  async readImages(
    id: string,
    successCallBack?: () => void
  ): Promise<ProductImage[]> {
    const getObservable: Observable<ProductImage[]> =
      this.httpClientService.get<ProductImage[]>(
        {
          action: 'getimages',
          controller: 'products',
        },
        id
      );

    const images: ProductImage[] = await firstValueFrom(getObservable);
    successCallBack();
    getObservable.subscribe((r) => console.log(r));
    return images;
  }

  async deleteImage(
    id: string,
    imageId: string,
    successCallBack?: () => void,
    errorCallBack?: () => void
  ) {
    const deleteObservable = this.httpClientService.delete(
      {
        action: 'deleteimage',
        controller: 'products',
        queryString: `imageId=${imageId}`,
      },
      id
    );
    await firstValueFrom(deleteObservable);
    deleteObservable.subscribe(
      (response) => {
        successCallBack();
        console.log(response);
      },
      (responseError: HttpErrorResponse) => {
        errorCallBack();
        console.log(responseError);
      }
    );
  }
  async changeShowcaseImage(imageId: string, productId: string, successCallBack?: () => void): Promise<void> {
    const changeShowcaseImageObservable = this.httpClientService.get({
      controller: "products",
      action: "ChangeShowcaseImage",
      queryString: `imageId=${imageId}&productId=${productId}`
    });
    await firstValueFrom(changeShowcaseImageObservable);
    successCallBack();
  }
}
