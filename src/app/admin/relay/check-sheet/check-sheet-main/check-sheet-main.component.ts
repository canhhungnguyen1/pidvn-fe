import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckSheetService } from '../services/check-sheet.service';

@Component({
  selector: 'app-check-sheet-main',
  templateUrl: './check-sheet-main.component.html',
  styleUrls: ['./check-sheet-main.component.scss']
})
export class CheckSheetMainComponent implements OnInit {

  constructor(private router: Router, private checkSheetSvc: CheckSheetService) { }

  ngOnInit(): void {
  }

  showGuideline() {
    this.checkSheetSvc.showGuideline().subscribe((responseMessage) => {
      let file = new Blob([responseMessage], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

}
