import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckSheetService } from '../services/check-sheet.service';

@Component({
  selector: 'app-check-sheet-process',
  templateUrl: './check-sheet-process.component.html',
  styleUrls: ['./check-sheet-process.component.scss'],
})
export class CheckSheetProcessComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private checkSheetSvc: CheckSheetService
  ) {}

  processes: any;

  master: any;
  line: any;
  model: any;

  isOpenAddModelModal: boolean = false;
  models!: any[];

  processSelected: any;
  updateForm!: UntypedFormGroup;

  ngOnInit(): void {
    this.master = this.activatedRoute.snapshot.queryParams['master'];
    this.line = this.activatedRoute.snapshot.queryParams['line'];
    this.model = this.activatedRoute.snapshot.queryParams['model'];
    this.getProcesses();
    this.getModels();
  }

  getProcesses() {
    this.checkSheetSvc
      .getProcesses(this.master, this.line, this.model)
      .subscribe((response) => {
        console.log('Processes: ', response);
        this.processes = response;
      });
  }

  rowClick(data: any) {
    this.router.navigate(['admin/relay/check-sheet/item'], {
      queryParams: {
        master: this.master,
        process: data.id,
        processName: data.name,
      },
    });
  }

  /**
   * Thêm model vào các công đoạn
   */
  openAddModelModal(data: any) {
    this.processSelected = { ...data };

    this.updateForm = this.fb.group({
      models: [JSON.parse(this.processSelected.models)],
    });

    this.isOpenAddModelModal = true;
  }

  cancelAddModel() {
    this.isOpenAddModelModal = false;
  }

  addModel() {
    let obj: any = {};
    obj.id = this.processSelected.id;
    obj.models = JSON.stringify(this.updateForm.value.models);

    this.checkSheetSvc.updateProcess(obj).subscribe((response) => {
      this.getProcesses();
      this.isOpenAddModelModal = false;
    });
  }

  getModels() {
    this.checkSheetSvc.getModels().subscribe((response) => {
      this.models = response;
    });
  }
}
