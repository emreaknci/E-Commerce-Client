import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUser } from 'src/app/contracts/users/createUser';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClientService: HttpClientService) {}
  async createUser(user: User):Promise<CreateUser> {
    const observable: Observable<CreateUser | User> =
      this.httpClientService.post<CreateUser | User>(
        {
          controller: 'users',
        },
        user
      );
     return await firstValueFrom(observable) as CreateUser;
  }
}
