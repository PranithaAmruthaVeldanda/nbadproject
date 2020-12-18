import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Chart } from 'chart.js'

@Component({
  selector: 'pb-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  chartOptions = {
    responsive: true
  }

  labels = [];

  chartData = [
    {
      label: 'Current Budget',
      data: []
    },
    {
      label: 'Maximum Budget',
      data: []
    }
  ];

  colors = [
    {
      backgroundColor: '#66B2FF'
    },
    {
      backgroundColor: '#FF6666'
    }
  ]

  onChartClick(event) {
    console.log(event);
  }
  public loggedInUserName:any;


  constructor(private http: HttpClient,public _dataService: DataService) { }

  ngOnInit(): void {

    this.loggedInUserName = this._dataService.loggedInUserName;
    this._dataService.getData(this.loggedInUserName)
    .subscribe((res: any) => {
      console.log(res[0]);
      for (let i = 0; i < res.length; i++) {

        this.chartData[0].data[i] = res[i].budget;
        this.chartData[1].data[i] = res[i].maxbudget;
        this.labels[i] = res[i].title;

      }
    });
    }


}
