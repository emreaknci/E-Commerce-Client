import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { AuthService } from './services/common/auth.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { HttpClientService } from './services/common/http-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ECommerceClient';
  
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;
  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    private httpClientService: HttpClientService,
    private dynamicLoadComponentService:DynamicLoadComponentService
  ) {
    // httpClientService
    //   .post({ controller: 'baskets' },{productId:"e510726f-f078-4384-9abf-a3834cce50c9",quantity:50})
    //   .subscribe((data) => console.log(data));
    // httpClientService
    // .put({ controller: 'baskets' },{basketItemId:"630272b4-7c43-49f6-bc4e-c5f8a53411d4",quantity:10})
    // .subscribe((data) => console.log(data));
    // httpClientService
    //   .get({ controller: 'baskets' })
    //   .subscribe((data) => console.log(data));
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem('accessToken');
    this.authService.identityCheck();
    this.toastrService.info('Oturumunuz sonlandırıldı.', '', {
      positionClass: 'toast-bottom-right',
    });
  }
  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }
}
