import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent extends BaseComponent implements OnInit {
  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallTrianglePath);
  }
}
