import { Component, OnInit } from '@angular/core';
import { Itemlist } from 'src/app/models/itemlist';
import { HoneybillService } from 'src/app/services/honeybill.service';



@Component({
  selector: 'app-billingdetails',
  templateUrl: './billingdetails.component.html',
  styleUrls: ['./billingdetails.component.css']
})
export class BillingdetailsComponent implements OnInit {
  price=0;
  item!: Itemlist[];
  loading: boolean = false;
  itemlistdata: Itemlist[] = [];
  itemlist: Itemlist = {
    id: '',
    group: '',
    brand: '',
    print_name: '',
    purchase_price: 0,
    sale_price: 0,
    min_sale_price: 0,
    mrp: '',
    opening_stock: 0,
    opening_stock_value: 0,
    low_level_limit: 0,
    product_type: '',
    serial_no: '',
    hsn_code: '',
    item_code: '',
    sku: '',
    item_name: '',
    unit: '',
    GST: 0,
    IGST: 0,
    CGST: 0,
    SGST: 0,
    cess: 0,
    hsn_name: '',
    hsn_description: '',
    bar_code: '',
    shortname: '',
    subgroup: '',
    supplier: '',
    maximum_qty: 0,
    barcode_status: '',
    stock_maintainance: false,
    box_qty: 0,
    customer_discount: 0,
    dealer_discount: 0,
    whole_salerate: 0,
    rack_group: '',
    rack_name: '',
    quotation_status: '',
    tax_status: '',
    productimage: '',
    allow_weighing_scale: false,
    salesman_commission: false,
    salesman_commission_amount: '',
    current_stock: 0
  };
  // loading!: boolean;

  constructor(private honeybillService: HoneybillService) { }
  
  ngOnInit(): void {
    this.getItemlists();
  }
  getItemlists() {
    try {
      this.loading = true;
      setTimeout(async () => {
        (await this.honeybillService.getItemlist()).subscribe((itemlist: Itemlist[]) => {
          this.itemlistdata = [];
          this.itemlistdata = itemlist;
          this.loading = false;
        })
      }, 500);
    } catch (e) {
      throw e
    }
  }
  onIncrement(): void {
    this.price += 1;
    }
   
    onDecrement(): void {
    this.price -= 1;
    }
}
