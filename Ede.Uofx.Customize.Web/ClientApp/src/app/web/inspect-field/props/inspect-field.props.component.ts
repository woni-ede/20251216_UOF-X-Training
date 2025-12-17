import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BpmFwPropsComponent } from '@uofx/web-components/form';

@Component({
  selector: 'app-inspect-field.props',
  templateUrl: './inspect-field.props.component.html',
  styleUrl: './inspect-field.props.component.scss'
})
export class InspectFieldPropsComponent extends BpmFwPropsComponent{
 constructor(public fb: FormBuilder){
    super(fb);
 }

 ngOnInit(): void {
  this.pluginUtils.initPluginSettings({
    toBeSubjects: [{ name: '檢驗日期', jsonPath: 'inspDate' }],
    toBeConditions: [{ name: '檢驗數量', jsonPath: 'inspQuantity', type: 'Numeric' }],
    toBeNodes: [{ name: '檢驗人員', jsonPath: 'inspector' }],
    searchContentJsonPath: 'inspProduct',
    toBeExports: [{ name: '評語', jsonPath: 'comment' }]
  })

 }
}
