import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/common/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ECommerceClient';

  constructor(public authService:AuthService,private toastrService:ToastrService) {
    authService.identityCheck();
  }

  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.toastrService.info("Oturumunuz sonlandırıldı.","",{positionClass:"toast-bottom-right"})
  }
}
