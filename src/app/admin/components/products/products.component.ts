import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Product } from 'src/app/contracts/product';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(spinnerService: NgxSpinnerService,private httpClientService:HttpClientService) {
    super(spinnerService);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Pacman);
    this.httpClientService.get<Product[]>({controller:"products"}).subscribe(data=>console.log(data[0]));
    // this.httpClientService.post({controller:"products"},{
    //   name:"kalem",
    //   unitsInStock:100,
    //   price:5
    // }).subscribe(data=>console.log(data))

    // this.httpClientService.put({controller:"products"},{
    //   id:"feb34215-3339-456c-b250-d23d9b1ceafa",
    //   name:"kalem15",
    //   unitInStock:15,
    //   price:4
    // }).subscribe();
    
    this.httpClientService.delete({
      controller:"products"
    },"feb34215-3339-456c-b250-d23d9b1ceafa").subscribe()
  }
}
