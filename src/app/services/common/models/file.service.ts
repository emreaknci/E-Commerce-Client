import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { BaseUrl } from 'src/app/contracts/baseUrl';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private httpClientService: HttpClientService) {}

  async getAzureStorageUrl():  Promise<BaseUrl> {
    const getObservable: Observable<BaseUrl> = this.httpClientService.get<BaseUrl>({
      controller: "files",
      action: "GetAzureStorageUrl"
    });
    return await firstValueFrom(getObservable);
  }
}
