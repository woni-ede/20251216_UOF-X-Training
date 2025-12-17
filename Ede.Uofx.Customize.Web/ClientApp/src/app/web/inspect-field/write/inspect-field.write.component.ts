import { Component } from '@angular/core';
import { BpmFwWriteComponent } from '@uofx/web-components/form';

@Component({
  selector: 'app-inspect-field.write',
  templateUrl: './inspect-field.write.component.html',
  styleUrl: './inspect-field.write.component.scss'
})
export class InspectFieldWriteComponent extends BpmFwWriteComponent {

  errorMessage: string[] = [];

  inspResults = [
    { name: '通過', code: 'PASSED' },
    { name: '不通過', code: 'FAILED' },
    { name: '需複驗', code: 'RETEST' }
  ];
}
