import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BpmFwWriteComponent, UofxValidators } from '@uofx/web-components/form';

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

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      comment: ['', [Validators.required, UofxValidators.notAllowedSpaceString]],
      inspQuantity: [0, [Validators.required, Validators.min(1)]],
      inspResult: [null]
    })
  }
}
