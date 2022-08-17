import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ProductList } from 'src/app/contracts/productList';
import { ProductService } from 'src/app/services/common/models/product.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinnerService: NgxSpinnerService,
    private productService: ProductService
  ) {
    super(spinnerService);
  }

  displayedColumns: string[] = [
    'name',
    'unitInStock',
    'price',
    'createdDate',
    'updatedDate',
  ];
  dataSource: MatTableDataSource<ProductList> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  async ngOnInit() {
    await this.getProducts();
  }
  async getProducts() {
    this.showSpinner(SpinnerType.BallTrianglePath);

    const products: { totalCount: number; list: ProductList[] } =
      await this.productService.getProductList(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.BallAtom)
      );
    this.dataSource = new MatTableDataSource<ProductList>(products.list);
    this.paginator.length = products.totalCount;

    console.log("fasda",this.dataSource);
    console.log(products.totalCount);
    // this.dataSource.paginator = this.paginator;
  }

  async pageChanged() {
    await this.getProducts();
  }
}
