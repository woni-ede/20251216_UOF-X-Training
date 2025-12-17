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
}
