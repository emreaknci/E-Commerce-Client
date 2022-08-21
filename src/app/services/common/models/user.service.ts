import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUser } from 'src/app/contracts/users/createUser';
import { LoginUser } from 'src/app/contracts/users/loginUser';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../http-client.service';
import { Token } from "src/app/contracts/token/token"
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClientService: HttpClientService,
    private toastrService: ToastrService
  ) {}

  async createUser(user: User): Promise<CreateUser> {
    const observable: Observable<CreateUser | User> =
      this.httpClientService.post<CreateUser | User>(
        {
          controller: 'users',
        },
        user
      );
    return (await firstValueFrom(observable)) as CreateUser;
  }

  async login(
    user: { userNameOrEmail: string; password: string },
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<
      any | TokenResponse
    >(
      {
        controller: 'users',
        action: 'login',
      },
      user
    );
    const response = (await firstValueFrom(observable)) as TokenResponse;
    console.log("das",response)
    if (response) {
      localStorage.setItem("accessToken",response.token.accessToken);
      
      this.toastrService.success(response.message);
    }
    callBackFunction();
  }
}
