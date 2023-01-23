import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from 'src/app/services/common/role.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { AlertifyService } from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spiner: NgxSpinnerService,
    private roleService: RoleService,
    private alertify: AlertifyService) {
    super(spiner)
  }

  ngOnInit(): void {
  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  create(name: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);


    this.roleService.create(name.value, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.success("Role başarıyla eklenmiştir.");
      this.createdRole.emit(name.value);
    }, errorMessage => {
      this.alertify.error(errorMessage);
    });
  }
}