import {
  FacebookLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService,
    spinnerService: NgxSpinnerService
  ) {
    super(spinnerService);
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      console.log(user);
      this.showSpinner(SpinnerType.BallAtom);
      switch (user.provider) {
        case 'GOOGLE':
          await userService.googleLogin(user, () => {
            authService.identityCheck();
            this.hideSpinner(SpinnerType.BallAtom);
          });
          break;
        case 'FACEBOOK':
          await userService.facebookLogin(user, () => {
            authService.identityCheck();
            this.hideSpinner(SpinnerType.BallAtom);
          });
          break;
      }
    });
  }

  ngOnInit(): void {
    this.createLoginFormGroup();
  }
  loginFormGroup: FormGroup;
  submitted: boolean = false;
  createLoginFormGroup() {
    this.loginFormGroup = this.formBuilder.group({
      userNameOrEmail: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  get component() {
    return this.loginFormGroup.controls;
  }
  async onSubmit(user: { userNameOrEmail: string; password: string }) {
    this.submitted = true;

    if (this.loginFormGroup.valid) {
      this.showSpinner(SpinnerType.BallTrianglePath);
      await this.userService.login(user, () => {
        this.authService.identityCheck();
        this.activatedRoute.queryParams.subscribe((params) => {
          const returnUrl: string = params['returnUrl'];
          if (returnUrl) this.router.navigate([returnUrl]);
        });

        this.hideSpinner(SpinnerType.BallTrianglePath);
      });
    } else {
      this.toastrService.error(
        'Hatalı veya eksik veri girişi yaptınız.',
        'Kayıt Başarısız!'
      );
    }
  }
  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
