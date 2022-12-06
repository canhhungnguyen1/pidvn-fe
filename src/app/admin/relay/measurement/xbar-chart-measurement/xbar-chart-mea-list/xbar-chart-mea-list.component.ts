import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-xbar-chart-mea-list',
  templateUrl: './xbar-chart-mea-list.component.html',
  styleUrls: ['./xbar-chart-mea-list.component.scss']
})
export class XbarChartMeaListComponent implements OnInit {

  constructor(private router: Router) { }

  items = [
    { id: 6, name: 'Lực 2 chốt tán Spring với Yoke', itemType: 1 },
    { id: 2, name: 'Khoảng cách khe hở bobbin tới tai Armature', itemType: 2 },
    { id: 21, name: 'Kích thước khe hở giữa Yoke - Bobbin', itemType: 2 }
  ]

  dataSource: any[] = new Array();

  ngOnInit(): void {}

  onRowClick(data: any) {
    this.router.navigate(['admin/relay/measurement/xbar-chart-detail'], {
      queryParams: {
        item: data.id,
        itemType: data.itemType,
        itemName: data.name
      },
    });

  }
}
