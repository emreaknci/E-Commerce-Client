import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Role } from 'src/app/contracts/roles/role';
import { RoleService } from 'src/app/services/common/role.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { AlertifyService } from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private roleService: RoleService,
    private alertifyService: AlertifyService,
  ) {
    super(spinner)
  }


  displayedColumns: string[] = ['name', 'edit', 'delete'];
  dataSource: MatTableDataSource<Role> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getRoles() {
    this.showSpinner(SpinnerType.BallAtom);
    const allRoles: { datas: Role[], totalCount: number } = await this.roleService.getRoles(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
      () => this.hideSpinner(SpinnerType.BallAtom),
      errorMessage => this.alertifyService.error(errorMessage))

    this.dataSource = new MatTableDataSource<Role>(allRoles.datas);
    this.paginator.length = allRoles.totalCount;
  }

  async pageChanged() {
    await this.getRoles();
  }

  async ngOnInit() {
    await this.getRoles();
  }

}