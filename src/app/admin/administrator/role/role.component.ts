import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from '../services/permission.service';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private roleSvc: RoleService,
    private permissionSvc: PermissionService,
    private toastr: ToastrService
  ) {}

  roles!: any[];
  isVisibleCreateForm: boolean = false;
  isVisibleUpdateForm: boolean = false;

  permissions!: any[];
  permissionsSelected!: any[];

  createForm!: UntypedFormGroup;
  updateForm!: UntypedFormGroup;

  roleSelected!: any;

  ngOnInit(): void {
    this.getRoles();
    this.getPermission();

    this.createForm = this.fb.group({
      name: [null, [Validators.required]],
      label: [null, [Validators.required]],
      description: [null, [Validators.required]],
      permission: [null],
    });
  }

  getRoles() {
    this.roleSvc.getRoles().subscribe((response) => {
      this.roles = response;
    });
  }

  getPermission() {
    this.permissionSvc.getPermissions().subscribe((response) => {
      this.permissions = response;
    });
  }

  cancelCreateRole() {
    this.createForm.reset();
    for (const key in this.createForm.controls) {
      if (this.createForm.controls.hasOwnProperty(key)) {
        this.createForm.controls[key].markAsPristine();
        this.createForm.controls[key].updateValueAndValidity();
      }
    }
    this.isVisibleCreateForm = false;
  }

  saveCreateRole() {
    for (const i in this.createForm.controls) {
      if (this.createForm.controls.hasOwnProperty(i)) {
        this.createForm.controls[i].markAsDirty();
        this.createForm.controls[i].updateValueAndValidity();
      }
    }
    if (!this.createForm.valid) {
      return;
    }

    let obj = { ...this.createForm.value };
    obj.permission = JSON.stringify(obj.permission);

    console.log(obj);

    this.roleSvc.createRole(obj).subscribe((response) => {
      this.toastr.success('Success !');
      this.isVisibleCreateForm = false;
      this.getRoles();
    });
  }

  onRoleClick(role: any) {
    this.roleSelected = role;

    this.updateForm = this.fb.group({
      id: [this.roleSelected.id],
      name: [this.roleSelected.name, [Validators.required]],
      label: [this.roleSelected.label, [Validators.required]],
      description: [this.roleSelected.description, [Validators.required]],
      permission: [JSON.parse(this.roleSelected.permission)],
    });

    this.isVisibleUpdateForm = true;
  }

  cancelUpdateRole() {
    this.updateForm.reset();
    this.isVisibleUpdateForm = false;
  }

  saveUpdateRole() {
    if (!this.updateForm.valid) {
      return;
    }

    let obj = { ...this.updateForm.value };
    obj.permission = JSON.stringify(obj.permission);

    console.log(obj);

    this.roleSvc.updateRole(obj).subscribe((response) => {
      this.toastr.success('Success !');
      this.isVisibleUpdateForm = false;
      this.getRoles();
    });
  }
}
