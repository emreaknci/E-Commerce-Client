import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalRService } from 'src/app/services/common/signalr.service';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { HubUrls } from 'src/app/constants/hub-urls';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(
    spinnerService: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private signalRService:SignalRService
  ) {
    super(spinnerService);
    signalRService.start(HubUrls.OrderHub);
    signalRService.start(HubUrls.ProductHub);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.SquareJellyBox);

    this.signalRService.on(HubUrls.OrderHub,ReceiveFunctions.OrderCreatedMessageReceiveFunction,message=>{
      this.alertifyService.notify(message);
    });
    this.signalRService.on(HubUrls.ProductHub,ReceiveFunctions.ProductAddedMessageReceiveFunction,message=>{
      this.alertifyService.warning(message);
    });
  }

  m() {
    this.alertifyService.success('faddada');
  }
  d() {
    this.alertifyService.dismissAll();
  }
}
