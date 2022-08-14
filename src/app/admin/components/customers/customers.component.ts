import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent extends BaseComponent implements OnInit {
  constructor(spinnerService: NgxSpinnerService) {
    super(spinnerService);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.Pacman);
  }
}
