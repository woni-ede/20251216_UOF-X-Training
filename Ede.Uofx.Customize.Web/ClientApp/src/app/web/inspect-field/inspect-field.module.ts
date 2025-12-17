import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UofxFormModule, UofxFormFieldBaseModule } from '@uofx/web-components/form';
import { InspectFieldWriteComponent } from './write/inspect-field.write.component';
import { InspectFieldPropsComponent } from './props/inspect-field.props.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { UofxButtonModule } from '@uofx/web-components/button';
import { UofxDialogModule } from '@uofx/web-components/dialog';
import { ProductListComponent } from './write/_dialog/product-list/product-list.component';
import { TableModule } from 'primeng/table';
import { BASIC_HTTP_HANDLER, MyHttpHandler } from '@service/basic/basic-http-handler';
import { BasicHttpClient } from '@service/basic/basic-http-client';
import { NorthWindService } from '@service/northwind.service';

@NgModule({
  declarations: [
    InspectFieldWriteComponent,
    InspectFieldPropsComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UofxFormModule,
    UofxFormFieldBaseModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    UofxButtonModule,
    UofxDialogModule,
    TableModule
  ],
  providers: [
    { provide: BASIC_HTTP_HANDLER, useClass: MyHttpHandler },
    BasicHttpClient,
    NorthWindService
  ]
})
export class InspectFieldModule {
  static comp = {
    props: InspectFieldPropsComponent,
    design: InspectFieldWriteComponent,
    write: InspectFieldWriteComponent,
    view: InspectFieldWriteComponent,
    print: InspectFieldWriteComponent
  }
}
