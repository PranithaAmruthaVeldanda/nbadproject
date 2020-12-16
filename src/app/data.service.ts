import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { UserSchema } from './models/users';
import { Router } from '@angular/router';
import { BudgetSchema } from '../app/models/budget';

import { ToastrModule, ToastrService } from 'ngx-toastr';

export interface Item {
  name: string;
  value: number;
  abs: number;
}

@Injectable({
  providedIn: 'root'
})


export class DataService {

DataObservable: Observable<any>;
userData : Observable<UserSchema[]>


isUserLoggedIn = new Subject<boolean>();

constructor(private http: HttpClient,public router: Router,private toastr:ToastrService) { }

getData(): Observable<any> {
  if (this.DataObservable) {
    return this.DataObservable;
  } else {
    const token = localStorage.getItem('jwt');
    const headers = {'content-type': 'application/json','Authorization' : `Bearer ${token}`};
    this.DataObservable = this.http.get('http://localhost:3000/budget').pipe(shareReplay());
    return this.DataObservable;
  }
}

addBudgetdata(data:BudgetSchema){
  const headers = {'content-type': 'application/json'};
  const body=JSON.stringify(data);
  console.log(body)
  return this.http.post('http://localhost:3000/budget',body,{'headers':headers});
}

private readonly NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  private readonly MIN_ITEM = 10;
  private readonly MAX_ITEM = 20;

  private readonly MAX_VALUE = 100;

  private generateRandomValue(start: number, end: number) {
    return Math.ceil(Math.random() * (end - start) + start);
  }

  getData1(): Item[] {

    const nbItems = this.generateRandomValue(this.MIN_ITEM, this.MAX_ITEM);
    console.log(nbItems);
    const samples = [];
    for (let i = 0; i < nbItems; i++) {
      const val = this.generateRandomValue(1, this.MAX_VALUE);
      samples.push({
        name: this.NAMES[i],
        value: val,
        abs: Math.abs(val)
      });
    }
    return samples;
  }
  userSignUp(data:UserSchema){
    const headers = {'content-type': 'application/json'};
    const body=JSON.stringify(data);
    return this.http.post('http://localhost:3000/users',body,{'headers':headers});
  }

  invaliduser(){
   this.toastr.error("User does not exist. Please proceed to signup page",'Error');
  }

  loginSuccessful(){
    this.toastr.success('Logged In','Success');
  }

  userLogin(data:UserSchema){
    const headers = {'content-type': 'application/json'};
    const body=JSON.stringify(data);
    console.log(body)
    return this.http.post('http://localhost:3000/auth',body,{'headers':headers}).subscribe((res:any)=>{
      console.log(res);
      localStorage.setItem('accessToken',res.token);
          localStorage.setItem('refreshToken',res.refreshToken);
          this.isUserLoggedIn.next(true);
          this.loginSuccessful();
          this.router.navigate(['/homepage']);
        },err=>{
           // this.invaliduser();
        })
    }
    public getLoginStatus(): Observable<boolean> {
      return this.isUserLoggedIn;
    }
    public logout(): void {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.isUserLoggedIn.next(false);
      this.router.navigate(['/login']);
    }
    verifyTokenPresence(){
      return !!localStorage.getItem('token');
    }

}
