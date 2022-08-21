import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { AuthService, _isAuthenticated } from 'src/app/services/common/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private toastrService: ToastrService,
    private spinnerService:NgxSpinnerService,
    private authService:AuthService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinnerService.show(SpinnerType.Pacman);
    // const token: string = localStorage.getItem('accessToken');
    // let isExpired: boolean = null;
    // try {
    //   isExpired = this.jwtHelper.isTokenExpired(token);
    // } catch (error) {
    //   isExpired = true;
    // }

    if (!_isAuthenticated) {
      this.toastrService.warning(
        'Önce oturum açmalısınız',
        'Yetkisiz Giriş Hatası!'
      );
      this.router.navigate(['login'], {
        queryParams: { returnUrl: state.url },
      });
    }
    this.spinnerService.hide(SpinnerType.Pacman)
    return true;
  }
}
