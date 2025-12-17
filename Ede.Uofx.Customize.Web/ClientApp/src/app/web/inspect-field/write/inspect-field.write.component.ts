import { Component } from '@angular/core';
import { BpmFwWriteComponent } from '@uofx/web-components/form';

@Component({
  selector: 'app-inspect-field.write',
  templateUrl: './inspect-field.write.component.html',
  styleUrl: './inspect-field.write.component.scss'
})
export class InspectFieldWriteComponent extends BpmFwWriteComponent {

  errorMessage: string[] = [];
}
