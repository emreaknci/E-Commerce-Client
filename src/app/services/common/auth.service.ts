import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) {}

  identityCheck() {
    const token: string = localStorage.getItem('accessToken');
    let isExpired: boolean = null;
    try {
      isExpired = this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      isExpired = true;
    }
    _isAuthenticated = token != null && !isExpired;
  }

  get isAuthenticated():boolean{
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;
