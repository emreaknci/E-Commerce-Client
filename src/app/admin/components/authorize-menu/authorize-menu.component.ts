import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../../base/base.component';
import { Menu } from '../../../contracts/application-configurations/menu';
import { AuthorizeMenuDialogComponent } from '../../../dialogs/authorize-menu-dialog/authorize-menu-dialog.component';
import { DialogService } from '../../../services/common/dialog.service';
import { ApplicationService } from '../../../services/common/models/application.service';

@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrls: ['./authorize-menu.component.scss']
})
export class AuthorizeMenuComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private applicationService: ApplicationService, private dialogService: DialogService) {
    super(spinner)
  }

  async ngOnInit() {
    this.endpoints = await this.applicationService.getAuthorizeDefinitionEndpoints();
  }

  endpoints: Menu[] = [];

  assignRole(code: string, name: string) {
    this.dialogService.openDialog({
      componentType: AuthorizeMenuDialogComponent,
      data: { code: code, name: name },
      options: {
        width: "750px"
      },
      afterClosed: () => {

      }
    });
  }
}