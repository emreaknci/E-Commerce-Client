import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of } from 'rxjs';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(private toastrService: ToastrService,    
    private userAuthService:UserAuthService
    ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('interceptro deverede');
    let message: string = '';
    let title: string = '';
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            message = 'Bu işlemi yapmak için gerekli yetkiye sahip değilsiniz.';
            title = 'Yetkisiz İşlem!';
            this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data=>{
              
            });
            break;
          case HttpStatusCode.InternalServerError:
            message = 'Sunucuya erişilemiyor';
            title = 'Sunucu Hatası!';
            break;
          case HttpStatusCode.BadRequest:
            message = 'Geçersiz bir istekte bulundunuz.';
            title = 'Geçersiz İstek!';
            break;
          case HttpStatusCode.NotFound:
            message = 'Sayfa bulunamadı.';

            break;
          default:
            message = 'Beklenmeyen bir hata ile karşılaşıldı.';
            title = 'Hata!';
            break;
        }
        this.toastrService.warning(message, title);
        return of(error);
      })
    );
  }
}
