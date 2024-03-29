import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { OrderDetailDialogComponent } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/order.service';
import { OrderList } from './../../../../contracts/order/orderList';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinnerService: NgxSpinnerService,
    private dialogService: DialogService,
    private orderService: OrderService,
    private alertifyService: AlertifyService
  ) {
    super(spinnerService);
  }

  displayedColumns: string[] = [
    'orderCode',
    'userName',
    'totalPrice',
    'createdDate',
    'completed',
    'viewDetail',
    'delete',
  ];
  dataSource: MatTableDataSource<OrderList> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  async ngOnInit() {
    await this.getOrders();
  }

  async getOrders() {
    const allOrders: { totalOrderCount: number; orders: OrderList[] } = 
    await this.orderService.getAllOrders(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, 
      () => this.hideSpinner(SpinnerType.BallAtom), (errorMessage: any) => {
      this.alertifyService.error(errorMessage.message);
    })
    this.dataSource = new MatTableDataSource<OrderList>(allOrders.orders);
    this.paginator.length = allOrders.totalOrderCount;
  }

  async pageChanged() {
    await this.getOrders();
  }

  addProductImages(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: { width: '50%' },
    });
  }

  showDetail(id: string) {
    this.dialogService.openDialog({
      componentType: OrderDetailDialogComponent,
      data: id,
      options: {
        width: '50%',
      },
    });
  }
}
