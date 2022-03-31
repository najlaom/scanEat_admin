import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private adminService: AdminService,
    private router : Router){}
    
  canActivate()
  {
    if(this.adminService.loggedIn()){
      return true;

    }
    this.router.navigate(['login']);
    return false;
    
  }
  
}
