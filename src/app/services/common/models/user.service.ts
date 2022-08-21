import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUser } from 'src/app/contracts/users/createUser';
import { LoginUser } from 'src/app/contracts/users/loginUser';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClientService: HttpClientService) {}

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
  ): Promise<LoginUser> {
    const observable: Observable<any |LoginUser> = this.httpClientService.post(
      {
        controller: 'users',
        action: 'login',
      },
      user
    );

    return await firstValueFrom(observable) as LoginUser;
    callBackFunction();
  }
}
