import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Itemlist } from 'src/app/models/itemlist';
import { HoneybillService } from 'src/app/services/honeybill.service';


@Component({
 
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})
export class ItemlistComponent implements OnInit {
  arrayimg!:any;
 
  preview!:any;
  image!:any;
  deltitemId_: any;
  item!: Itemlist[];
  searchitem!: FormGroup;
  currentTutorial: any = null;
  currentIndex = -1;
  name!:any;
  loading: boolean = false;
  itemlistdata: Itemlist[] = [];
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
   
  getitemid_!:any;
  constructor(private honeybillService: HoneybillService,private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.searchitem = new FormGroup({
     search_name: new FormControl(''),
    });
    this.getItemlists();
   
  }
  // Passid(data: any){
  //   this.getitemid =data;
  //   console.log(this.getitemid);
  //   this.getimage(this.getitemid);
  //  }
  Passid= (data: any) => {
    this.getitemid_ = Object.assign(data);
    console.log(this.getitemid_);
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

  searchName()
  {
    this.itemlistdata = this.itemlistdata.filter(x => (x.item_name)==this.searchitem.controls['search_name'].value  )

  } 

  list()
{
  if(this.searchitem.controls['search_name'].value.length == 0)
  {
    this.getItemlists();
    
  }
}

NewMachines() {
  let currentUrl = this.router.url;
  let newUrl;
  this.router.navigateByUrl('/', {
    skipLocationChange: true,
    replaceUrl: true
  }).then(() => {
    this.router.navigate([currentUrl]);
  });
}

Passidfromdeletemodal = (data: any) => {
  this.deltitemId_ = Object.assign(data);
  console.log(this.deltitemId_);
}

deleteitemlists(id: string): void {
  try {
    this.honeybillService.deleteItemlist(this.deltitemId_)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    this.NewMachines();
  } catch (e) {
  }
   
}


getimage (id: string,data:any){
  // this.preview='';
  // this.honeybillService.getByItemlistId(id)
  // .subscribe({
  //   next: (data) => {
      if(data!=null){
        console.log('its there..');
        var bytes =  data;// get from server
        console.log(data);
         var u8 = new Uint8Array(bytes.data);
        // // var decoder = new TextDecoder('utf8');
        // // var b64encoded = btoa(decoder.decode(u8));
        // // // console.log(`data:image/jpg;base64` +b64encoded);
        // // console.log(b64encoded);
        var b64encoded = btoa(this.Uint8ToString(u8));
      }  this.preview=this.image;
// }

//   })
}

}
