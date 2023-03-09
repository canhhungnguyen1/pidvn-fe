import { Component, OnInit } from '@angular/core';
import { QaOqcDocumentService } from '../services/qa-oqc-document.service';

@Component({
  selector: 'app-qa-oqc-document-models',
  templateUrl: './qa-oqc-document-models.component.html',
  styleUrls: ['./qa-oqc-document-models.component.scss']
})
export class QaOqcDocumentModelsComponent implements OnInit {

  constructor(private oqcDocumentSvc: QaOqcDocumentService) { }

  models: any;

  ngOnInit(): void {
    this.getModels()
  }

  getModels() {
    this.oqcDocumentSvc.getModels().subscribe(
      response => {
        this.models = response;
      }
    );
  }

}
