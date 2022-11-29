import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { Itemlist } from 'src/app/models/itemlist';
import { Masters } from 'src/app/models/Masters';
import { HoneybillService } from 'src/app/services/honeybill.service';

@Component({
  selector: 'app-view-itemlist',
  templateUrl: './view-itemlist.component.html',
  styleUrls: ['./view-itemlist.component.css']
})
export class ViewItemlistComponent implements OnInit {
  filteredgrp!:Group[];
  gstvalue!:any;
  cgstval!:any;
  igstval!:any;
  sgstval!:any;
  hsncode!:any;
  cess!:any;
  unitmasterlistdata:Masters[]=[];
  groupmasterlistdata:Group[]=[];
  branddata: Masters[] = [];
  loading: boolean = false;
  isLinear = false;
  ditemlistid: any;
  viewItemlist!: FormGroup;
  itemdetails = '';
  @Input() addMode = false;
  itemlist: Itemlist = {
    id: '',
    hsn_code: '',
    item_code: '',
    sku: '',
    item_name: '',
    unit: '',
    product_type: '',
    serial_no: '',
    group: '',
    brand: '',
    print_name: '',
    purchase_price: 0,
    sale_price: 0,
    min_sale_price: 0,
    mrp: 0,
    opening_stock: 0,
    opening_stock_value: 0,
    low_level_limit: 0,
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
  constructor(private honeybillService: HoneybillService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.viewItemlist = new FormGroup({
      hsn_code: new FormControl('', ),
      group: new FormControl(''),
      brand: new FormControl(''),
      print_name: new FormControl(''),
      purchase_price: new FormControl(''),
      sale_price: new FormControl(''),
      min_sale_price: new FormControl(''),
      mrp: new FormControl(''),
      opening_stock: new FormControl(''),
      opening_stock_value: new FormControl(''),
     serial_no: new FormControl(''),
      product_type: new FormControl(''),
      item_code: new FormControl(''),
      sku: new FormControl(''),
      item_name: new FormControl(''),
      unit: new FormControl(''),
      low_level_limit: new FormControl(''),
      GST: new FormControl(''),
      IGST: new FormControl(''),
      CGST: new FormControl(''),
      SGST: new FormControl(''),
      cess: new FormControl(''),
      current_stock: new FormControl(''),
      hsn_name: new FormControl(''),
      hsn_description: new FormControl(''),
      bar_code: new FormControl(''),
      shortname: new FormControl(''),
    
      subgroup: new FormControl(''),
      supplier: new FormControl('',),
      maximum_qty: new FormControl(''),
      barcode_status: new FormControl(''),
      stock_maintainance: new FormControl(''),
      box_qty: new FormControl(''),
      customer_discount: new FormControl(''),
      dealer_discount: new FormControl(''),
      whole_salerate: new FormControl(''),
      rack_group: new FormControl(''),
      rack_name: new FormControl(''),
      quotation_status: new FormControl(''),
      tax_status: new FormControl(''),
      productimage: new FormControl(''),
      allow_weighing_scale: new FormControl(''),
      salesman_commission: new FormControl(''),
      salesman_commission_amount: new FormControl(''),
    });
    if (!this.addMode) {
      this.getitemlist(this.route.snapshot.params["id"]);
    }

    this.ditemlistid = this.route.snapshot.params["id"];
    console.log(this.ditemlistid);

    this.getBrand();
    this.getUnit()
    this.getgroupmasterlist();
  }

  getitemlist(id: string): void {
    try {
      this.honeybillService.getByItemlistId(id)
        .subscribe({
          next: (data) => {
            this.itemlist = data;
            this.viewItemlist.controls['hsn_code'].setValue(this.itemlist.hsn_code);
            this.viewItemlist.controls['item_code'].setValue(this.itemlist.item_code);
            this.viewItemlist.controls['group'].setValue(this.itemlist.group);
            this.viewItemlist.controls['brand'].setValue(this.itemlist.brand);
            this.viewItemlist.controls['sku'].setValue(this.itemlist.sku);
            this.viewItemlist.controls['item_name'].setValue(this.itemlist.item_name);
            this.viewItemlist.controls['unit'].setValue(this.itemlist.unit);
            this.viewItemlist.controls['IGST'].setValue(this.itemlist.IGST);
            this.viewItemlist.controls['CGST'].setValue(this.itemlist.CGST);
            this.viewItemlist.controls['SGST'].setValue(this.itemlist.SGST);
            this.viewItemlist.controls['stock_maintainance'].setValue(this.itemlist.stock_maintainance);
            this.viewItemlist.controls['allow_weighing_scale'].setValue(this.itemlist.allow_weighing_scale);
            this.viewItemlist.controls['salesman_commission'].setValue(this.itemlist.salesman_commission);
            this.viewItemlist.controls['current_stock'].setValue(this.itemlist.current_stock);
            this.viewItemlist.controls['print_name'].setValue(this.itemlist.print_name);
            this.viewItemlist.controls['purchase_price'].setValue(this.itemlist.purchase_price);
            this.viewItemlist.controls['sale_price'].setValue(this.itemlist.sale_price);
            this.viewItemlist.controls['min_sale_price'].setValue(this.itemlist.min_sale_price);
            this.viewItemlist.controls['mrp'].setValue(this.itemlist.mrp);
            this.viewItemlist.controls['opening_stock'].setValue(this.itemlist.opening_stock);
            this.viewItemlist.controls['opening_stock_value'].setValue(this.itemlist.opening_stock_value);
            this.viewItemlist.controls['serial_no'].setValue(this.itemlist.serial_no);
            this.viewItemlist.controls['low_level_limit'].setValue(this.itemlist.low_level_limit);
            this.viewItemlist.controls['product_type'].setValue(this.itemlist.product_type);
            this.viewItemlist.controls['GST'].setValue(this.itemlist.GST);
            this.viewItemlist.controls['hsn_name'].setValue(this.itemlist.hsn_name);
            this.viewItemlist.controls['hsn_description'].setValue(this.itemlist.hsn_description);
            this.viewItemlist.controls['bar_code'].setValue(this.itemlist.bar_code);
            this.viewItemlist.controls['shortname'].setValue(this.itemlist.shortname);
            this.viewItemlist.controls['subgroup'].setValue(this.itemlist.subgroup);
            this.viewItemlist.controls['supplier'].setValue(this.itemlist.supplier);
            this.viewItemlist.controls['maximum_qty'].setValue(this.itemlist.maximum_qty);
            this.viewItemlist.controls['barcode_status'].setValue(this.itemlist.barcode_status);
            this.viewItemlist.controls['box_qty'].setValue(this.itemlist.box_qty);
            this.viewItemlist.controls['customer_discount'].setValue(this.itemlist.customer_discount);
            this.viewItemlist.controls['cess'].setValue(this.itemlist.cess);
           
            this.viewItemlist.controls['dealer_discount'].setValue(this.itemlist.dealer_discount);
            this.viewItemlist.controls['whole_salerate'].setValue(this.itemlist.whole_salerate);
            this.viewItemlist.controls['rack_group'].setValue(this.itemlist.rack_group);
            this.viewItemlist.controls['rack_name'].setValue(this.itemlist.rack_name);
            this.viewItemlist.controls['quotation_status'].setValue(this.itemlist.quotation_status);
            this.viewItemlist.controls['tax_status'].setValue(this.itemlist.tax_status);
            this.viewItemlist.controls['productimage'].setValue(this.itemlist.productimage);
 
            this.viewItemlist.controls['salesman_commission_amount'].setValue(this.itemlist.salesman_commission_amount);
             console.log(data);
          },
          error: (e) => console.error(e)
        });
    } catch (e) {
      console.log('Machines - getMachineId' + e);
      alert('Machines - getMachineId' + e);
    }
  }



    //  *****************************************   delete  particular machine detail ***************************************

    deleteItemlists(id: string): void {
      try {
        this.honeybillService.deleteItemlist(id)
          .subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (e) => console.error(e)
          });
        // this.NewMachines();
       
      } catch (e) {
        console.log('Machines - deleteMachines' + e);
        alert('Machines - deleteMachines' + e);
      }
        // this.router.navigate(['/itemlist']);
    }


    getBrand() {
      try {
        this.loading = true;
        setTimeout(async () => {
          (await this.honeybillService.getbrandmasterlist('B')).subscribe((brandmasterlist:Masters[])=>{
            this.branddata = [];
            this.branddata = brandmasterlist;
            this.loading = false;
            
          })
        }, 500);
      } catch (e) {
        console.log('getbrandmaster error'+e);
      }
    }
  
    getUnit() {
      try {
        this.loading = true;
        setTimeout(async () => {
          (await this.honeybillService.getbrandmasterlist('U')).subscribe((unitmasterlist:Masters[])=>{
            this.unitmasterlistdata = [];
            this.unitmasterlistdata = unitmasterlist;   
            this.loading = false;
            
          })
        }, 500);
      } catch (e) {
        console.log('getbrandmaster error'+e);
      }
    }
  
    getgroupmasterlist() {
      try {
        this.loading = true;
        setTimeout(async () => {
          (await this.honeybillService.getgroupmasterlist()).subscribe((groupmaster: Group[]) => {
            this. groupmasterlistdata= [];
            
            this.groupmasterlistdata =groupmaster;
            console.log(this.groupmasterlistdata)
            this.loading = false;
          })
        }, 500);
      } catch (e) {
        throw e
      }
    }

    bindgstdetails(){
      this.filteredgrp = this.groupmasterlistdata.filter(x => x.group_name == this.viewItemlist.controls['group'].value);
      this.gstvalue = this.filteredgrp[0].HSN_GST;
      this.igstval = this.filteredgrp[0].IGST;
      this.sgstval = this.filteredgrp[0].SGST;
      this.cgstval = this.filteredgrp[0].CGST;
      this.hsncode = this.filteredgrp[0].hsnsac_code;
      this.cess = this.filteredgrp[0].Cess;
      this.viewItemlist.controls['GST'].setValue(this.gstvalue);
      this.viewItemlist.controls['IGST'].setValue(this.igstval);
      this.viewItemlist.controls['CGST'].setValue(this.cgstval);
      this.viewItemlist.controls['SGST'].setValue(this.sgstval);
      this.viewItemlist.controls['cess'].setValue(this.cess);
      this.viewItemlist.controls['hsn_code'].setValue(this.hsncode);
     }

}
