import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BpmFwWriteComponent, UofxFormFieldLogic, UofxFormTools, UofxValidators } from '@uofx/web-components/form';

@Component({
  selector: 'app-inspect-field.write',
  templateUrl: './inspect-field.write.component.html',
  styleUrl: './inspect-field.write.component.scss'
})
export class InspectFieldWriteComponent extends BpmFwWriteComponent implements OnInit {

  form: FormGroup;
  errorMessage: string[] = [];

  inspResults = [
    { name: '通過', code: 'PASSED' },
    { name: '不通過', code: 'FAILED' },
    { name: '需複驗', code: 'RETEST' }
  ];

  constructor(private fb: FormBuilder,
    private tools: UofxFormTools,
    private fieldLogic: UofxFormFieldLogic
  ) {
    super();
  }

  ngOnInit() {
    this.initForm();
    this.fieldUtils.syncParentFormStatusToInnerForm(this.form);
  }

  initForm() {
    this.form = this.fb.group({
      comment: ['', [Validators.required, UofxValidators.notAllowedSpaceString]],
      inspQuantity: [0, [Validators.required, Validators.min(1)]],
      inspResult: [null]
    })
    this.setFormValue();
  }

  setFormValue() {
    if (this.value) {
      this.form.controls.comment.setValue(this.value.comment);
      this.form.controls.inspQuantity.setValue(this.value.inspQuantity);
      this.form.controls.inspResult.setValue(this.value.inspResult);
    }
  }

  checkBeforeSubmit(checkValidator: boolean): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.valueChanges.emit(this.form.value);
      this.tools.markFormGroup(this.form);
      this.fieldLogic.checkValidators(checkValidator, this.selfControl, this.form);
      if (!checkValidator) return resolve(true);
      resolve(this.form.valid);
    });
  }
}
