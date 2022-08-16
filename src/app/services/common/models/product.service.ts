import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductAdd } from 'src/app/contracts/productAdd';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  addProduct(model: ProductAdd,successCallBack?:any,errorCallBack?:(errorList:string[])=>void) {
    this.httpClientService
      .post({ controller: 'products' }, model)
      .subscribe((reponse) => {
        successCallBack();
      },(responseError:HttpErrorResponse)=>{
        const _error=responseError.error;
        console.log("error",_error);
        if(responseError.error.length>=1){
     
          let errorList:string[]=[];
          for (let i = 0; i < _error.length; i++) {
            errorList.push(_error[i].value[0]);
          }   
          errorCallBack?.(errorList);
        }
      });
  }
}
