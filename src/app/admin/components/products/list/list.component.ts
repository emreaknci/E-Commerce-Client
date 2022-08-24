import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ProductList } from 'src/app/contracts/productList';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';

// declare var $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinnerService: NgxSpinnerService,
    private productService: ProductService,
    private alertifyService:AlertifyService,
    private dialogService:DialogService
  ) {
    super(spinnerService);
    // alertifyService.dialog("başlık","mesaj",()=>{
    //   console.log("dafsdsadasdssa");
    // })
  }

  displayedColumns: string[] = [
    'name',
    'unitInStock',
    'price',
    'createdDate',
    'updatedDate',
    'images',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<ProductList> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  async ngOnInit() {
    await this.getProducts();
  }
  async getProducts() {
    this.showSpinner(SpinnerType.BallTrianglePath);

    const responseData: { totalCount: number; products: ProductList[] } =
      await this.productService.getProductList(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.Pacman)
      );

    this.dataSource = new MatTableDataSource<ProductList>(responseData.products);
    // console.table(responseData.products);
    this.paginator.length = responseData.totalCount;
  }

  async pageChanged() {
    await this.getProducts();
  }

  addDPoductImages(id:string){
    this.dialogService.openDialog({
      componentType:SelectProductImageDialogComponent,
      data:id,
      options:{width:"50%"}
    })
  }
}
