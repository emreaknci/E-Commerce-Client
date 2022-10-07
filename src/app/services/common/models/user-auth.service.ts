import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private httpClientService: HttpClientService,
    private toastrService: ToastrService
  ) {}
  async login(
    user: { userNameOrEmail: string; password: string },
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> =
      this.httpClientService.post<any | TokenResponse>(
        {
          controller: 'auth',
          action: 'login',
        },
        user
      );
    const response = (await firstValueFrom(observable)) as TokenResponse;
    if (response.token) {
      this.toastrService.success('Giriş başarılı');
      localStorage.setItem('accessToken', response.token.accessToken);
      localStorage.setItem('refreshToken', response.token.refreshToken);
    } else {
      this.toastrService.error('Giriş başarısız');
    }
    callBackFunction();
  }

  async refreshTokenLogin(
    refreshToken: string,
    callBackFunction?: (state: any) => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> =
      this.httpClientService.post(
        { action: 'refreshTokenLogin', controller: 'auth' },
        { refreshToken: refreshToken }
      );
    try {
      const response: TokenResponse = (await firstValueFrom(
        observable
      )) as TokenResponse;

      if (response) {
        localStorage.setItem('accessToken', response.token.accessToken);
        localStorage.setItem('refreshToken', response.token.refreshToken);
      }
      callBackFunction(response ? true : false);
    } catch (error) {
      callBackFunction(false);
    }
  }

  async googleLogin(
    user: SocialUser,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> =
      this.httpClientService.post<SocialUser | TokenResponse>(
        {
          action: 'google-login',
          controller: 'auth',
        },
        user
      );
    observable.subscribe(
      (r) => console.log(r),
      (re) => console.log(re)
    );
    const response = (await firstValueFrom(observable)) as TokenResponse;
    if (response.token) {
      localStorage.setItem('accessToken', response.token.accessToken);
      localStorage.setItem('refreshToken', response.token.refreshToken);
      this.toastrService.success('Giriş başarılı');
    } else {
      this.toastrService.error('Giriş başarısız');
    }
    callBackFunction();
  }

  async facebookLogin(
    user: SocialUser,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> =
      this.httpClientService.post<SocialUser | TokenResponse>(
        {
          action: 'facebook-login',
          controller: 'auth',
        },
        user
      );
    observable.subscribe(
      (r) => console.log(r),
      (re) => console.log(re)
    );
    const response = (await firstValueFrom(observable)) as TokenResponse;
    if (response.token) {
      localStorage.setItem('accessToken', response.token.accessToken);
      localStorage.setItem('refreshToken', response.token.refreshToken);
      this.toastrService.success('Giriş başarılı');
    } else {
      this.toastrService.error('Giriş başarısız');
    }
    callBackFunction();
  }

  async passwordReset(email: string, callBackFunction?: () => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "auth",
      action: "password-reset"
    }, { email: email });

    await firstValueFrom(observable);
    callBackFunction();
  }

  async verifyResetToken(resetToken: string, userId: string, callBackFunction?: () => void): Promise<boolean> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "auth",
      action: "verify-reset-token"
    }, {
      resetToken: resetToken,
      userId: userId
    });

    const state: boolean = await firstValueFrom(observable);
    callBackFunction();
    return state;
  }
}
