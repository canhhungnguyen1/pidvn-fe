import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RelaySiteMapService } from '../services/relay-site-map.service';

@Component({
  selector: 'app-relay-project-list',
  templateUrl: './relay-project-list.component.html',
  styleUrls: ['./relay-project-list.component.scss'],
})
export class RelayProjectListComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private relaySiteMapService: RelaySiteMapService
  ) {}

  type!: string;

  dataSource: any = new Array();

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.queryParams['type'];

    this.getProjects();
  }

  getProjects() {
    this.relaySiteMapService.findProjectByType(this.type).subscribe((response) => {
      this.dataSource = response
    });
  }

  onRowClick(data: any) {
    window.location.href = data.link;
  }

  
}
