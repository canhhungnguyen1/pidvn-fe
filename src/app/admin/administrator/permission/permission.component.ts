import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from '../services/permission.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private permissionSvc: PermissionService
  ) {}

  permissions!: any[];

  isVisibleCreateForm: boolean = false;

  createForm!: UntypedFormGroup;

  ngOnInit(): void {
    this.getPermissions();

    this.createForm = this.fb.group({
      name: [null, [Validators.required]],
      label: [null, [Validators.required]],
      description: [null],
    });
  }

  getPermissions() {
    this.permissionSvc.getPermissions().subscribe((response) => {
      this.permissions = response;
      console.log(this.permissions);
    });
  }

  createPermission() {
    this.submitCreateForm();
  }

  submitCreateForm(): void {
    for (const i in this.createForm.controls) {
      if (this.createForm.controls.hasOwnProperty(i)) {
        this.createForm.controls[i].markAsDirty();
        this.createForm.controls[i].updateValueAndValidity();
      }
    }
    if (!this.createForm.valid) {
      return;
    }
    this.permissionSvc
      .createPermission(this.createForm.value)
      .subscribe((response) => {
        this.toastr.success('Success !');
        this.getPermissions();
        this.isVisibleCreateForm = false;
      });
  }

  resetForm(): void {
    this.createForm.reset();
    for (const key in this.createForm.controls) {
      if (this.createForm.controls.hasOwnProperty(key)) {
        this.createForm.controls[key].markAsPristine();
        this.createForm.controls[key].updateValueAndValidity();
      }
    }
    this.isVisibleCreateForm = false;
  }
}
