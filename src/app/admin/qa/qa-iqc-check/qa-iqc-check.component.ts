import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qa-iqc-check',
  templateUrl: './qa-iqc-check.component.html',
  styleUrls: ['./qa-iqc-check.component.scss'],
})
export class QaIqcCheckComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

}
