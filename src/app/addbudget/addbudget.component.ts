import { Component, NgZone, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-addbudget',
  templateUrl: './addbudget.component.html',
  styleUrls: ['./addbudget.component.scss']
})
export class AddbudgetComponent implements OnInit {

  budget:number;
  maxbudget:number;
  title:string

  constructor(private dataService:DataService,private toastr: ToastrService,private router:Router,private ngZone:NgZone) { }

  ngOnInit(): void {
  }


  incompleteDetails(){
    this.toastr.warning('Please enter all the fields','Warning');
  }

  randomColorGen(){
    let randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
    console.log(randomColor)
    return randomColor;
  }

  sendExpense(){
    let record = {};
    record['budget'] = this.budget;
    record['maxbudget'] = this.maxbudget;
    record['title'] = this.title.charAt(0).toUpperCase()+this.title.slice(1);
    record['color'] = this.randomColorGen();
    record['username'] = this.dataService.loggedInUserName;

    if(!this.budget || !this.maxbudget || !this.title){
      this.incompleteDetails();
      return;
    }
    else{
    this.dataService.addBudgetdata(record)
      .subscribe(data =>{
        console.log(data);
        this.budget = null;
        this.maxbudget = null;
        this.title = "";
        this.ngZone.run(() => {
          this.router.navigate(['/homepage']);
        });
      },
      err => {
        console.log("Same title already exists");
        this.title = "";
      })
  }
}

}
