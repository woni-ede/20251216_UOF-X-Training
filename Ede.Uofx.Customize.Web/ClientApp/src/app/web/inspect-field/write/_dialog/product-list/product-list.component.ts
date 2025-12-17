import { Component, OnInit } from '@angular/core';
import { ProductModel } from '@model/northwind.model';
import { NorthWindService } from '@service/northwind.service';
import { UofxDialog } from '@uofx/web-components/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent extends UofxDialog implements OnInit {

  products: ProductModel[] = [];
  selectedProducts: string;

  constructor(private northWindServ: NorthWindService) {
    super();
  }

  ngOnInit(){
    if(this.params.data) this.selectedProducts = this.params.data;
    this.getProducts();
  }

  getProducts() {
    this.northWindServ.getProducts().subscribe({
      next: res => {
        this.products = res;
      }
    })
  }
}
