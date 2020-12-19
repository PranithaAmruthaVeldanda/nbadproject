import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username:string;
  password:string;
  retypePassword:string;
  email:string

  public userData = [];


  constructor(private http:HttpClient,private router:Router,public _dataService: DataService) { }


  ngOnInit(): void {
  }


  loginFunction(){
    let record = {};
    record['username'] = this.username;
    record['password'] = this.password;
    record['email'] = this.email;
    record['retypePassword'] = this.retypePassword;
    console.log(this.userData);
    for(let i=0;i<this.userData.length;i++){
      if(this.userData[i].username == this.username){
        console.log('Username already exists');
        return;
      }
    }

    this.registrationProcess();
  }


  registrationProcess(){
    let record = {};
    record['username'] = this.username;
    record['password'] = this.password;
    record['email'] = this.email;
    record['retypePassword'] = this.retypePassword;
    console.log(JSON.stringify(record));
      if(!this.username || !this.password || !this.email || !this.retypePassword){
        console.log('Please enter all the fields');
        return;
      }else{
        console.log("In else")
      this._dataService.userSignUp(record)
        .subscribe(res =>{
          this.username = "";
          this.password = "";
          this.email = "";
          this.router.navigate(['/login']);
        },
        err =>{
          console.log("Validation failed");

        })
    }
  }
}
