import { Component } from '@angular/core';
import { NorthWindService } from '@service/northwind.service';
import { UofxPluginAuthorize, UofxPluginPage } from '@uofx/plugin';
import { MenuItem } from 'primeng/api';

@UofxPluginAuthorize({ functionId: 'CUSTOMERMANAGEMENT' })
@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrl: './customer-management.component.scss'
})
export class CustomerManagementComponent extends UofxPluginPage {

  constructor(private northwindServ: NorthWindService){
    super();
  }

  /** 麵包屑清單 */
  breadCrumbItems: Array<MenuItem> = [
    { label: '大廳', routerLink: [this.baseUrl.admin] },
    { label: '客戶管理' },
  ];
  /** 列表清單 */
  dataList = [];

  ngOnInit() {
    this.northwindServ.serverUrl = this.pluginSetting?.entryHost;
    this.getCustomers(1, 10);
  }

  getCustomers(page: number, limit: number){
    this.northwindServ.getCustomers(page, limit).subscribe({
      next: res=>{
        console.log(res);
        this.dataList = res;
      }
    })
  }
}
