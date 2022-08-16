import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ProductAdd } from 'src/app/contracts/productAdd';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(private productService:ProductService,spinnerService: NgxSpinnerService,private alertifyService:AlertifyService) { 
    super(spinnerService);
  }

  ngOnInit(): void {
  }

  addProduct(name:HTMLInputElement,price:HTMLInputElement,unitsInStock:HTMLInputElement){
    this.showSpinner(SpinnerType.SquareJellyBox);
    let model:ProductAdd={
      name:name.value,
      price:parseFloat(price.value),
      unitInStock:parseInt(unitsInStock.value)
    }
    this.productService.addProduct(model,()=>{
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.alertifyService.success("Ürün ekleme başarılı!");
    },(responseError)=>{
      this.hideSpinner(SpinnerType.SquareJellyBox);
      responseError.forEach(error => {
        this.alertifyService.error(error)
      });
    });
  }
}
