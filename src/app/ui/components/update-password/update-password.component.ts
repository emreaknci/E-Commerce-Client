import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/admin/alertify.service';

import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { User } from '../../../entities/user';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { UserService } from '../../../services/common/models/user.service';
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService,
    private userService: UserService,
    private router: Router
  ) {
    super(spinner);
  }

  state: any;

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
    this.activatedRoute.params.subscribe({
      next: async (params) => {
        const userId: string = params['userId'];
        const resetToken: string = params['resetToken'];
        this.state = await this.userAuthService.verifyResetToken(
          resetToken,
          userId,
          () => {
            this.hideSpinner(SpinnerType.BallAtom);
          }
        );
      },
    });
  }

  updatePassword(password: string, passwordConfirm: string) {
    this.showSpinner(SpinnerType.BallAtom);
    if (password != passwordConfirm) {
      this.alertifyService.error("Şifreler uyuşmuyor!")
      this.hideSpinner(SpinnerType.BallAtom);
      return;
    }

    this.activatedRoute.params.subscribe({
      next: async (params) => {
        const userId: string = params['userId'];
        const resetToken: string = params['resetToken'];
        await this.userService.updatePassword(
          userId,
          resetToken,
          password,
          passwordConfirm,
          () => {
            this.alertifyService.success("Şifreniz başarıyla güncellenmiştir.")
            this.router.navigate(['/login']);
          },
          (error) => {
            console.log(error);
          }
        );
        this.hideSpinner(SpinnerType.BallAtom);
      },
    });
  }
}
