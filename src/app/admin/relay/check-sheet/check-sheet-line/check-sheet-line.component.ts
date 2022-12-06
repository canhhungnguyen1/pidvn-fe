import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-sheet-line',
  templateUrl: './check-sheet-line.component.html',
  styleUrls: ['./check-sheet-line.component.scss']
})
export class CheckSheetLineComponent implements OnInit {

  constructor(private router: Router) { }

  lines = [
    { name: 'TB1', description: 'TB line 1' },
    { name: 'TB2', description: 'TB line 2' },
    { name: 'TB3', description: 'TB line 3' },
    { name: 'TB4', description: 'TB line 4' },
    { name: 'TB5', description: 'TB line 5' },
    { name: 'TE1', description: 'TE line 1' },
    { name: 'TE2', description: 'TE line 2' },
    { name: 'TL1', description: 'TL line 1' },
    { name: 'TL2', description: 'TL line 2' }
  ]

  ngOnInit(): void {

  }

  rowClick(line: any) {
    console.log('aaa: ', line)
    this.router.navigate(['admin/relay/check-sheet/process'], {
      queryParams: { master: 0, line: line.name },
    });
  }

}
