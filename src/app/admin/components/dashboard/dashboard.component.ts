import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(
    spinnerService: NgxSpinnerService,
    private alertifyService: AlertifyService
  ) {
    super(spinnerService);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.SquareJellyBox);
  }

  m() {
    this.alertifyService.success('faddada');
  }
  d() {
    this.alertifyService.dismissAll();
  }
}
