import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject, Observable } from "rxjs";

import { AdminData } from "../admin-data.model";

@Injectable({
  providedIn: 'root'
})
export class AdminSrviceService {
  private isAuthenticated = false; 
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
 
  constructor(private http: HttpClient, private router: Router) { }
  
  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createAdmin(phone: string, password: string) {
    const adminData: AdminData = { phone: phone, password: password };
    console.log(adminData)
    this.http
      .post("http://localhost:3000/admin/adminSignup", adminData)
      .subscribe(() => {
        this.router.navigate(["/admin-login"]);
      }, error => {
        this.authStatusListener.next(false);
      }); 
     
  }

  showOwnerPlayground():Observable<any>{
    return this.http.get<any>("http://localhost:3000/playgrounds/ownerPlayground");
  }

  restAdmin(phone: string){
    console.log(phone)
    const adminData = { phone: phone}
    this.http
    .post(
      "http://localhost:3000/admin/adminReset",
      adminData
       ).subscribe(respond=>{
         console.log(respond)
       })
  }

   

  
  login(phone: string, password: string){
    const adminData: AdminData = { phone: phone, password: password };
    console.log(adminData);
    this.http
      .post<{token:string; expiresIn: number }>(
        "http://localhost:3000/admin/adminLogin",
         adminData
         )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        console.log(token)
        if(token){
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate);
        this.router.navigate(["/"]);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }

  }

  logout(){
    this.token=null;
    this.isAuthenticated=false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
 
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
