import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { async } from 'rxjs';
import { BaseUrl } from 'src/app/contracts/baseUrl';
import { ProductList } from 'src/app/contracts/productList';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService:FileService
  ) {}

  products: ProductList[];
  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 6;
  pageList: number[] = [];
  baseUrl:BaseUrl
  async ngOnInit() {
    this.baseUrl=await this.fileService.getAzureStorageUrl();
    this.activatedRoute.params.subscribe(async (params) => {
      this.currentPageNo = parseInt(params['pageNo'] ?? 1);
      const data = await this.productService.getProductList(
        this.currentPageNo - 1,
        this.pageSize,
        () => {},
        (errorMessage) => {}
      );
      this.products = data.products;

      this.products = this.products.map<ProductList>(p => {
        const listProduct: ProductList = {
          id: p.id,
          createdDate: p.createdDate,
          imagePath: p.images.length ? p.images.find(p => p.showCase).path : "",
          name: p.name,
          price: p.price,
          unitInStock: p.unitInStock,
          updatedDate: p.updatedDate,
          images: p.images
        };

        return listProduct;
      });

      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];

      if (this.currentPageNo - 3 <= 0)
        for (let i = 1; i <= 7; i++)
          this.pageList.push(i);

      else if (this.currentPageNo + 3 >= this.totalPageCount)
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
          this.pageList.push(i);

      else
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
          this.pageList.push(i);
    });
  }
}
