import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/group';
import { Itemlist } from 'src/app/models/itemlist';
import { Masters } from 'src/app/models/Masters';
import { Productstock } from 'src/app/models/productstock';
import { HoneybillService } from 'src/app/services/honeybill.service';
import { environment } from 'src/environments/environment';
const baseUrl = `${environment.apiUrl}/api`;
@Component({
  selector: 'app-add-itemlist',
  templateUrl: './add-itemlist.component.html',
  styleUrls: ['./add-itemlist.component.css']
})
export class AddItemlistComponent implements OnInit {
  

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message_ = '';
  preview = '';
  image!:any;
 imageurl!:SafeUrl;

  shiftmasterid = '';
  @ViewChild("mycheckbox") mycheckbox:any;
  myModel = true;
  
  item_name!:any;
  item_code!:any;
  current_stock!:any;

  updatechck1: boolean = false;
  updatechck2: boolean = false;
  updatechck3: boolean = false;

  filteredgrp!:Group[];
  gstvalue!:any;
  cgstval!:any;
  igstval!:any;
  sgstval!:any;
  hsncode!:any;
  cess!:any;
 
  isChecked: boolean = false;
  isChecked2: boolean = false;
  isChecked3: boolean = false;
  valueSelected!: string;
  stock_maintainance = new FormControl();
  communicationmodes: string[] = ['YES', 'NO'];
  unitmasterlistdata:Masters[]=[];
  groupmasterlistdata:Group[]=[];
  branddata: Masters[] = [];
  loading: boolean = false;
  check!:any;
  isLinear = false;
  id_!: any;
  @Input() addMode = false;
  message!: any;
  addItemlist!: FormGroup;
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

  groupmaster:Group={
    group_name: '',
    hsnsac_code: '',
    id: '',
    CGST: 0,
    Cess: 0,
    SGST: 0,
    IGST: 0,
    active: false,
    HSN_CGST: 0,
    HSN_GST: 0
  }

  masters: Masters = {
    id: '',
    name: '',
    active: false,
    m_type: '',
    eventdate: ''
  };

  productstock: Productstock = {
    id: '',
    item_code: '',
    item_name: '',
    opening_stock: 0
  };

  constructor(private honeybillService: HoneybillService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private http: HttpClient) { }

  ngOnInit() {
   
    this.addItemlist = new FormGroup({
      hsn_code: new FormControl('', ),
      group: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      brand: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      print_name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      purchase_price: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      sale_price: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      min_sale_price: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      mrp: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      opening_stock: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      opening_stock_value: new FormControl(''),
     serial_no: new FormControl(''),
      product_type: new FormControl(''),
      item_code: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      sku: new FormControl(''),
      item_name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      unit: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      low_level_limit: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      GST: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      IGST: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      CGST: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      SGST: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      cess: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      current_stock: new FormControl(''),
      hsn_name: new FormControl(''),
      hsn_description: new FormControl(''),
      bar_code: new FormControl(''),
      shortname: new FormControl(''),
    
      subgroup: new FormControl(''),
      supplier: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      maximum_qty: new FormControl('', [Validators.required, Validators.maxLength(20)]),
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

    if (this.route.snapshot.params["id"] == null || this.route.snapshot.params["id"] == undefined ) {
      this.addMode = true;
    }
    if (!this.addMode) {
      this.getitemlist(this.route.snapshot.params["id"]);
   }
    // this.id_ = this.getitemlist(this.route.snapshot.params["id"]);
    this.getBrand();
    this.getUnit()
    this.getgroupmasterlist();
  }

  public myError = (hsn_code: string, errorName: string) => {
    return this.addItemlist.controls[hsn_code].hasError(errorName);
  }


  //  ***************************************** (Add New Data to Database) ***************************************
  saveItemlist(): void {
    try {
      if (this.addItemlist.valid) {
        const pdata = {
          hsn_code: this.addItemlist.controls['hsn_code'].value ,
          group: this.addItemlist.controls['group'].value  ? this.addItemlist.controls['group'].value : 0,
          brand: this.addItemlist.controls['brand'].value  ? this.addItemlist.controls['brand'].value : 0,
          print_name: this.addItemlist.controls['print_name'].value,
          purchase_price: this.addItemlist.controls['purchase_price'].value,
          sale_price: this.addItemlist.controls['sale_price'].value,
          min_sale_price: this.addItemlist.controls['min_sale_price'].value,
          mrp: this.addItemlist.controls['mrp'].value,
          opening_stock: this.addItemlist.controls['opening_stock'].value,
          opening_stock_value: this.addItemlist.controls['opening_stock_value'].value,
          serial_no: this.addItemlist.controls['serial_no'].value,
          current_stock: this.addItemlist.controls['current_stock'].value,
          item_code: this.addItemlist.controls['item_code'].value,
          sku: this.addItemlist.controls['sku'].value,
          item_name: this.addItemlist.controls['item_name'].value,
          unit: this.addItemlist.controls['unit'].value ? this.addItemlist.controls['unit'].value : 0,
          product_type: this.addItemlist.controls['product_type'].value ? this.addItemlist.controls['product_type'].value : 0,
          GST: this.addItemlist.controls['GST'].value ,
          IGST: this.addItemlist.controls['IGST'].value ,
          CGST: this.addItemlist.controls['CGST'].value ,
          SGST: this.addItemlist.controls['SGST'].value ,
          low_level_limit: this.addItemlist.controls['low_level_limit'].value,
          cess: this.addItemlist.controls['cess'].value ,
          
          hsn_name: this.addItemlist.controls['hsn_name'].value,
          hsn_description: this.addItemlist.controls['hsn_description'].value,
          bar_code: this.addItemlist.controls['bar_code'].value,
          shortname: this.addItemlist.controls['shortname'].value,
        
          subgroup: this.addItemlist.controls['subgroup'].value,
          supplier: this.addItemlist.controls['supplier'].value,
          maximum_qty: this.addItemlist.controls['maximum_qty'].value,
          barcode_status: this.addItemlist.controls['barcode_status'].value,
        
          stock_maintainance: this.updatechck1 ? this.isChecked : true,
          box_qty: this.addItemlist.controls['box_qty'].value,
          customer_discount: this.addItemlist.controls['customer_discount'].value,
          dealer_discount: this.addItemlist.controls['dealer_discount'].value,
          whole_salerate: this.addItemlist.controls['whole_salerate'].value,
          rack_group: this.addItemlist.controls['rack_group'].value,
          rack_name: this.addItemlist.controls['rack_name'].value,
          quotation_status: this.addItemlist.controls['quotation_status'].value,
          tax_status: this.addItemlist.controls['tax_status'].value,
          // productimage: this.addItemlist.controls['productimage'].value ? this.addItemlist.controls['productimage'].value : 0,
          productimage: this.preview,
          salesman_commission_amount: this.addItemlist.controls['salesman_commission_amount'].value,
          allow_weighing_scale: this.updatechck2 ? this.isChecked2 : true,
          salesman_commission: this.updatechck3 ? this.isChecked3 : true,
        };

          console.log(pdata);
          this.honeybillService.createItemlist(pdata)
          .subscribe({
            next: (res) => {
              console.log(res);
              const productdata = {
           
                item_code: this.addItemlist.controls['item_code'].value,
                item_name: this.addItemlist.controls['item_name'].value,
                opening_stock: this.addItemlist.controls['opening_stock'].value,
               
    
              };
              this.http.post(`${baseUrl}/productstock/add`, productdata).subscribe(productdata => {
                console.log(productdata);
              })
            },
            error: (e) => console.error(e)
          });
      this.message = 'Itemlist added successfully..!!';

      } else {
        return;
      }
      setTimeout(() => {
        this.NewItemlist();
      }, 2000);
    }
    catch (e) {
    }
  }

  NewItemlist() {
    try {
      let currentUrl = this.router.url;
      let newUrl;
      if (currentUrl.includes('edit') || currentUrl.includes('itemlist')) {
        let UrlAry = this.router.url.split('/');
        newUrl = UrlAry[1] + "/additemlist"
        currentUrl = newUrl;
      }
      this.router.navigateByUrl('/', {
        skipLocationChange: true,
        replaceUrl: true
      }).then(() => {
        this.router.navigate([currentUrl]);
      });
    } catch (e) {
      console.log('Itemlist - NewItemlist' + e);
      alert('Itemlist - NewItemlist' + e);
    }
  }

  Uint8ToString(u8a:any){
    var CHUNK_SZ = 0x8000;
    var c = [];
    for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
      c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
    }
    // console.log(c);
    // console.log(c.join(""));
    this.image=c.join("");
    console.log(this.image);
    return c.join("");
  }

  getitemlist(id: string): void {
    try {
      this.honeybillService.getByItemlistId(id)
        .subscribe({
          next: (data) => {
            if(data.productimage!=null){
              console.log('its there..');
              var bytes =  data.productimage;// get from server
              console.log(data.productimage);
               var u8 = new Uint8Array(bytes.data);
              // // var decoder = new TextDecoder('utf8');
              // // var b64encoded = btoa(decoder.decode(u8));
              // // // console.log(`data:image/jpg;base64` +b64encoded);
              // // console.log(b64encoded);
              var b64encoded = btoa(this.Uint8ToString(u8));
            }  this.preview=this.image;
            this.itemlist = data;
            this.addItemlist.controls['hsn_code'].setValue(this.itemlist.hsn_code);
            this.addItemlist.controls['item_code'].setValue(this.itemlist.item_code);
            this.addItemlist.controls['group'].setValue(this.itemlist.group);
            this.addItemlist.controls['brand'].setValue(this.itemlist.brand);
            this.addItemlist.controls['sku'].setValue(this.itemlist.sku);
            this.addItemlist.controls['item_name'].setValue(this.itemlist.item_name);
            this.addItemlist.controls['unit'].setValue(this.itemlist.unit);
            this.addItemlist.controls['IGST'].setValue(this.itemlist.IGST);
            this.addItemlist.controls['CGST'].setValue(this.itemlist.CGST);
            this.addItemlist.controls['SGST'].setValue(this.itemlist.SGST);
            this.addItemlist.controls['stock_maintainance'].setValue(this.itemlist.stock_maintainance);
            this.addItemlist.controls['allow_weighing_scale'].setValue(this.itemlist.allow_weighing_scale);
            this.addItemlist.controls['salesman_commission'].setValue(this.itemlist.salesman_commission);
            this.addItemlist.controls['current_stock'].setValue(this.itemlist.current_stock);
            this.addItemlist.controls['print_name'].setValue(this.itemlist.print_name);
            this.addItemlist.controls['purchase_price'].setValue(this.itemlist.purchase_price);
            this.addItemlist.controls['sale_price'].setValue(this.itemlist.sale_price);
            this.addItemlist.controls['min_sale_price'].setValue(this.itemlist.min_sale_price);
            this.addItemlist.controls['mrp'].setValue(this.itemlist.mrp);
            this.addItemlist.controls['opening_stock'].setValue(this.itemlist.opening_stock);
            this.addItemlist.controls['opening_stock_value'].setValue(this.itemlist.opening_stock_value);
            this.addItemlist.controls['serial_no'].setValue(this.itemlist.serial_no);
            this.addItemlist.controls['low_level_limit'].setValue(this.itemlist.low_level_limit);
            this.addItemlist.controls['product_type'].setValue(this.itemlist.product_type);
            this.addItemlist.controls['GST'].setValue(this.itemlist.GST);
            this.addItemlist.controls['hsn_name'].setValue(this.itemlist.hsn_name);
            this.addItemlist.controls['hsn_description'].setValue(this.itemlist.hsn_description);
            this.addItemlist.controls['bar_code'].setValue(this.itemlist.bar_code);
            this.addItemlist.controls['shortname'].setValue(this.itemlist.shortname);
            this.addItemlist.controls['subgroup'].setValue(this.itemlist.subgroup);
            this.addItemlist.controls['supplier'].setValue(this.itemlist.supplier);
            this.addItemlist.controls['maximum_qty'].setValue(this.itemlist.maximum_qty);
            this.addItemlist.controls['barcode_status'].setValue(this.itemlist.barcode_status);
            this.addItemlist.controls['box_qty'].setValue(this.itemlist.box_qty);
            this.addItemlist.controls['customer_discount'].setValue(this.itemlist.customer_discount);
            this.addItemlist.controls['cess'].setValue(this.itemlist.cess);
           
            this.addItemlist.controls['dealer_discount'].setValue(this.itemlist.dealer_discount);
            this.addItemlist.controls['whole_salerate'].setValue(this.itemlist.whole_salerate);
            this.addItemlist.controls['rack_group'].setValue(this.itemlist.rack_group);
            this.addItemlist.controls['rack_name'].setValue(this.itemlist.rack_name);
            this.addItemlist.controls['quotation_status'].setValue(this.itemlist.quotation_status);
            this.addItemlist.controls['tax_status'].setValue(this.itemlist.tax_status);
            this.addItemlist.controls['productimage'].setValue(this.itemlist.productimage);
 
            this.addItemlist.controls['salesman_commission_amount'].setValue(this.itemlist.salesman_commission_amount);
          console.log(data);
          },
          error: (e) => console.error(e)
        });

    } catch (e) {

    }
  }

  //  ***************************************** (Update Data ) *********************************************************************
  updateItemlist(): void {
    try {
      if (this.addItemlist.valid) {

        this.itemlist.hsn_code = this.addItemlist.controls['hsn_code'].value,
          this.itemlist.item_code = this.addItemlist.controls['item_code'].value,
          this.itemlist.item_name = this.addItemlist.controls['item_name'].value,
          this.itemlist.sku = this.addItemlist.controls['sku'].value,
          this.itemlist.unit = this.addItemlist.controls['unit'].value,
          this.itemlist.IGST = this.addItemlist.controls['IGST'].value,
          this.itemlist.CGST = this.addItemlist.controls['CGST'].value,
           this.itemlist.group = this.addItemlist.controls['group'].value ? this.addItemlist.controls['group'].value : 0,
          this.itemlist.brand = this.addItemlist.controls['brand'].value ? this.addItemlist.controls['brand'].value : 0,
          this.itemlist.print_name = this.addItemlist.controls['print_name'].value,
          this.itemlist.purchase_price = this.addItemlist.controls['purchase_price'].value,
          this.itemlist.sale_price = this.addItemlist.controls['sale_price'].value,
          this.itemlist.min_sale_price = this.addItemlist.controls['min_sale_price'].value,
          this.itemlist.mrp = this.addItemlist.controls['mrp'].value,
          this.itemlist.opening_stock = this.addItemlist.controls['opening_stock'].value,
          this.itemlist.opening_stock_value = this.addItemlist.controls['opening_stock_value'].value,
          this.itemlist.serial_no = this.addItemlist.controls['serial_no'].value,
          this.itemlist.low_level_limit = this.addItemlist.controls['low_level_limit'].value,
          this.itemlist.cess = this.addItemlist.controls['cess'].value,
          this.itemlist.product_type = this.addItemlist.controls['product_type'].value ? this.addItemlist.controls['product_type'].value : 0,
          this.itemlist.GST = this.addItemlist.controls['GST'].value,
          this.itemlist.SGST = this.addItemlist.controls['SGST'].value,
          this.itemlist.hsn_name = this.addItemlist.controls['hsn_name'].value,
          this.itemlist.hsn_description = this.addItemlist.controls['hsn_description'].value,
          this.itemlist.bar_code = this.addItemlist.controls['bar_code'].value,
          this.itemlist.shortname = this.addItemlist.controls['shortname'].value,
          this.itemlist.subgroup = this.addItemlist.controls['subgroup'].value,
          this.itemlist.supplier = this.addItemlist.controls['supplier'].value,
          this.itemlist.maximum_qty = this.addItemlist.controls['maximum_qty'].value,
          this.itemlist.barcode_status = this.addItemlist.controls['barcode_status'].value,
          this.itemlist.box_qty = this.addItemlist.controls['box_qty'].value,
          this.itemlist.customer_discount = this.addItemlist.controls['customer_discount'].value,
          this.itemlist.dealer_discount = this.addItemlist.controls['dealer_discount'].value,
          this.itemlist.whole_salerate = this.addItemlist.controls['whole_salerate'].value,
          this.itemlist.rack_group = this.addItemlist.controls['rack_group'].value,
          this.itemlist.rack_name = this.addItemlist.controls['rack_name'].value,
          this.itemlist.quotation_status = this.addItemlist.controls['quotation_status'].value,
          this.itemlist.tax_status = this.addItemlist.controls['tax_status'].value,
          this.itemlist.productimage = this.addItemlist.controls['productimage'].value ? this.addItemlist.controls['productimage'].value : 0,
          this.itemlist.salesman_commission_amount = this.addItemlist.controls['salesman_commission_amount'].value,
          this.itemlist.stock_maintainance = this.updatechck1 ? this.isChecked : this.addItemlist.controls['stock_maintainance'].value,
          this.itemlist.allow_weighing_scale = this.updatechck2 ? this.isChecked2 : this.addItemlist.controls['allow_weighing_scale'].value,
          this.itemlist.salesman_commission = this.updatechck3 ? this.isChecked3 : this.addItemlist.controls['salesman_commission'].value,
          this.itemlist.current_stock = this.addItemlist.controls['current_stock'].value,
          this.honeybillService.updateItemlist(this.itemlist.id, this.itemlist)
            .subscribe({
              next: (res) => {
                console.log(res);
                this.addMode = false;
              },
              error: (e) => console.error(e)
            });
          
        this.message = 'Itemlist edited successfully..!!';
       
      }
      setTimeout(() => {
        this.router.navigate(['/itemlist']);
      }, 2000);
    } catch (e) {
    }
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

  comboChange(event:any) {
    this.updatechck1 = true 
    if(event.checked==true) 
    {
      this.isChecked = true;
      
    }
    else if(event.checked==false)
    {
      this.isChecked = false;
    }
  console.log(this.isChecked);
 }
  comboweighing(event:any) {
    this.updatechck2 = true 
    if(event.checked==true) 
    {
      this.isChecked2 = true;
    }
    else if(event.checked==false)
    {
      this.isChecked2 = false;
    }
     console.log(this.isChecked2);
    
  }
  combosales(event:any) {
    this.updatechck3 = true 
    if(event.checked==true) 
    {
      this.isChecked3 = true;
    }
    else if(event.checked==false)
    {
      this.isChecked3 = false;
    }
     console.log(this.isChecked3);
    
  }

  bindgstdetails(){
    this.filteredgrp = this.groupmasterlistdata.filter(x => x.group_name == this.addItemlist.controls['group'].value);
    this.gstvalue = this.filteredgrp[0].HSN_GST;
    this.igstval = this.filteredgrp[0].IGST;
    this.sgstval = this.filteredgrp[0].SGST;
    this.cgstval = this.filteredgrp[0].CGST;
    this.hsncode = this.filteredgrp[0].hsnsac_code;
    this.cess = this.filteredgrp[0].Cess;
    this.addItemlist.controls['GST'].setValue(this.gstvalue);
    this.addItemlist.controls['IGST'].setValue(this.igstval);
    this.addItemlist.controls['CGST'].setValue(this.cgstval);
    this.addItemlist.controls['SGST'].setValue(this.sgstval);
    this.addItemlist.controls['cess'].setValue(this.cess);
    this.addItemlist.controls['hsn_code'].setValue(this.hsncode);
   }
    validateForm() {
    this.check = document.getElementById('itemname');
   
    if (this.addItemlist.controls['item_name'].value == "" || this.addItemlist.controls['group'].value == '' || this.addItemlist.controls['mrp'].value == ''  || this.addItemlist.controls['brand'].value == ''  || this.addItemlist.controls['low_level_limit'].value == '') {
      alert("Required fields must be filled out");
      this.renderer.selectRootElement('#itemname').focus();
    }
  }

  selectFile(event: any): void {
    this.message_ = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;
        
        const reader = new FileReader();

        reader.onload = (e: any) => {
         console.log(e.target.result);
         this.preview = e.target.result;      
        };
         reader.readAsDataURL(this.currentFile);
        //  reader.readAsText(this.currentFile);
      }
    }
  }
}
