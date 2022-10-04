import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { UserAuthService } from './models/user-auth.service';
import { SpinnerType } from '../../base/base.component';
@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(
    private toastrService: ToastrService,
    private userAuthService: UserAuthService,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.userAuthService
              .refreshTokenLogin(
                localStorage.getItem('refreshToken'),
                (state: any) => {
                  if (!state) {
                    const url = this.router.url;
                    if (url == '/products')
                      this.toastrService.info(
                        'Sepete ürün eklemek için oturum açmanız gerekiyor.',
                        'Giriş Yapmalısınız.'
                      );
                  } else {
                    this.toastrService.warning(
                      'Bu işlemi yapmak için gerekli yetkiye sahip değilsiniz.',
                      'Yetkisiz İşlem!'
                    );
                  }
                }
              )
              .then((data) => {});
            break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.warning(
              'Sunucuya erişilemiyor',
              'Sunucu Hatası!'
            );
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.warning(
              'Geçersiz bir istekte bulundunuz.',
              'Geçersiz İstek!'
            );
            break;
          case HttpStatusCode.NotFound:
            this.toastrService.warning('Sayfa bulunamadı.');
            break;
          default:
            this.toastrService.warning(
              'Beklenmeyen bir hata ile karşılaşıldı.',
              'Hata!'
            );
            break;
        }
        return of(error);
      })
    );
  }
}
