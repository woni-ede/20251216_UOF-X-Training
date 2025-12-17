import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UofxFormModule, UofxFormFieldBaseModule } from '@uofx/web-components/form';
import { InspectFieldWriteComponent } from './write/inspect-field.write.component';
import { InspectFieldPropsComponent } from './props/inspect-field.props.component';


@NgModule({
  declarations: [
    InspectFieldWriteComponent,
    InspectFieldPropsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UofxFormModule,
    UofxFormFieldBaseModule
  ]
})
export class InspectFieldModule { }
