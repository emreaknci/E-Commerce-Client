import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(  private httpClientService: HttpClientService,
    private toastrService: ToastrService) { }
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
      this.toastrService.success("Giriş başarılı");
      localStorage.setItem('accessToken', response.token.accessToken);
    } else {
      this.toastrService.error("Giriş başarısız");
    }
    callBackFunction();
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
      observable.subscribe((r)=>console.log(r),(re)=>console.log(re))
    const response = (await firstValueFrom(observable)) as TokenResponse;
    if (response.token) {
      localStorage.setItem('accessToken', response.token.accessToken);
      this.toastrService.success("Giriş başarılı");
    }
    else{
      this.toastrService.error("Giriş başarısız");
    }
    callBackFunction();
  }



  async facebookLogin( user: SocialUser,
    callBackFunction?: () => void
  ): Promise<any>{
    const observable: Observable<SocialUser | TokenResponse> =
    this.httpClientService.post<SocialUser | TokenResponse>(
      {
        action: 'facebook-login',
        controller: 'auth',
      },
      user
    );
    observable.subscribe((r)=>console.log(r),(re)=>console.log(re))
    const response = (await firstValueFrom(observable)) as TokenResponse;
    if (response.token) {
      localStorage.setItem('accessToken', response.token.accessToken);
      this.toastrService.success("Giriş başarılı");
    }
    else{
      this.toastrService.error("Giriş başarısız");
    }
    callBackFunction();
  }
}
