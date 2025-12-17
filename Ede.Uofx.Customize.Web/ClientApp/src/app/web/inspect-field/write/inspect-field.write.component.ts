import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UofxDialogController, UofxDialogOptions } from '@uofx/web-components/dialog';
import { BpmFwWriteComponent, UofxFormFieldLogic, UofxFormTools, UofxValidators } from '@uofx/web-components/form';
import { ProductListComponent } from './_dialog/product-list/product-list.component';
import { NorthWindService } from '@service/northwind.service';
import { Settings, UofxConsole } from '@uofx/core';
import { UofxUserSetItemType, UofxUserSetPluginHelper } from '@uofx/web-components/user-select';
import { UofxFilePluginService } from '@uofx/web-components/file';
import { environment as env } from '@env/environment';

@Component({
  selector: 'app-inspect-field.write',
  templateUrl: './inspect-field.write.component.html',
  styleUrl: './inspect-field.write.component.scss'
})
export class InspectFieldWriteComponent extends BpmFwWriteComponent implements OnInit {

  form: FormGroup;
  errorMessage: string[] = [];
  corpId = Settings.UserInfo.corpId;
  types: Array<UofxUserSetItemType> = [UofxUserSetItemType.DeptEmployee];
  pluginCode = env.manifest.code;

  inspResults = [
    { name: '通過', code: 'PASSED' },
    { name: '不通過', code: 'FAILED' },
    { name: '需複驗', code: 'RETEST' }
  ];

  constructor(private fb: FormBuilder,
    private tools: UofxFormTools,
    private fieldLogic: UofxFormFieldLogic,
    private dialogCtrl: UofxDialogController,
    private northWindServ: NorthWindService,
    private userSetHelper: UofxUserSetPluginHelper,
    private filePluginServ: UofxFilePluginService
  ) {
    super();
  }

  ngOnInit() {
    this.northWindServ.serverUrl = this.pluginSetting?.entryHost;
    this.initForm();
    this.fieldUtils.syncParentFormStatusToInnerForm(this.form);
  }

  initForm() {
    this.form = this.fb.group({
      comment: ['', [Validators.required, UofxValidators.notAllowedSpaceString]],
      inspQuantity: [0, [Validators.required, Validators.min(1)]],
      inspResult: [null],
      inspProduct: [null, Validators.required],
      inspDate: [null],
      inspector: [null],
      inspReport: [null]
    })
    this.setFormValue();
  }

  setFormValue() {
    if (this.value) {
      this.form.controls.comment.setValue(this.value.comment);
      this.form.controls.inspQuantity.setValue(this.value.inspQuantity);
      this.form.controls.inspResult.setValue(this.value.inspResult);
      this.form.controls.inspProduct.setValue(this.value.inspProduct);
      this.form.controls.inspDate.setValue(this.value.inspDate);
      this.form.controls.inspector.setValue(this.value.inspector);
      this.form.controls.inspReport.setValue(this.value.inspReport);
    } else {
      this.userSetHelper.getUserSetByType(
        UofxUserSetItemType.DeptEmployee, [{ deptCode: 'd8', account: 'woni' }]
      ).subscribe({
        next: res => {
          this.form.controls.inspector.setValue(res);
        }
      })
    }
  }

  showDialog() {
    this.dialogCtrl.create(<UofxDialogOptions>{
      component: ProductListComponent,
      size: 'large',
      params: { data: this.form.controls.inspProduct.value }
    }).afterClose.subscribe({
      next: res => {
        if (res) this.form.controls.inspProduct.setValue(res);
      }
    })
  }

  clearProduct() {
    this.form.controls.inspProduct.setValue(null);
  }

  checkBeforeSubmit(checkValidator: boolean): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.valueChanges.emit(this.form.value);
      this.tools.markFormGroup(this.form);
      this.fieldLogic.checkValidators(checkValidator, this.selfControl, this.form);
      this.filePluginServ.submitFile(this.form.controls.inspReport.value).subscribe({
        next: res => {
          UofxConsole.log("已提交");
        }
      })
      if (!checkValidator) return resolve(true);
      resolve(this.form.valid);
    });
  }
}
