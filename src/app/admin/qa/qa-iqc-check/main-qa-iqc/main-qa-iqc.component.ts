import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-qa-iqc',
  templateUrl: './main-qa-iqc.component.html',
  styleUrls: ['./main-qa-iqc.component.scss'],
})
export class MainQaIqcComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  clickBtnRequest() {
    this.router.navigate(['admin/qa/qa-iqc-check/iqc-request']);
  }

  clickBtnHandle() {
    this.router.navigate(['admin/qa/qa-iqc-check/iqc-handle']);
  }
}
