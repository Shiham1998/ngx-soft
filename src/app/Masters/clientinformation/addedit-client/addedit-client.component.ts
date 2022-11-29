import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clients } from 'src/app/models/client';
import { HoneybillService } from 'src/app/services/honeybill.service';
import { countrydata } from 'src/assets/_outlet-json/country'; 
import { statedata } from 'src/assets/_outlet-json/state';

@Component({
  selector: 'app-addedit-client',
  templateUrl: './addedit-client.component.html',
  styleUrls: ['./addedit-client.component.css']
})
export class AddeditClientComponent implements OnInit {

  // variable for getting a base64string selectFile()
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  addMode!: boolean;
  fg_clientdetails!:FormGroup;
  // variable for getting a decoded base64 string for binding
  image!:any;

  clientlist:Clients={
    full_name: '',
    billing_address: '',
    city: '',
    state: '',
    pincode: 0,
    country: '',
    emailid: '',
    phoneno: '',
    contactno: '',
    panno: '',
    GSTin: '',
    Type: '',
    openingbalance: 0,
    doctype: '',
    docno: '',
    DOB: '',
    anniversary: '',
    creditallowed: '',
    creditlimit: 0,
    remarknote: '',
    active: false,
    id: '',
    profile_pic:''
  }
 
  constructor(private honeybillservice:HoneybillService,private route: ActivatedRoute,private router: Router) { }

  countryList!: any[];
  stateList!: any[];

  ngOnInit(): void {
   
    this.stateList=statedata;
    this.countryList=countrydata;
    try{
      this.fg_clientdetails=new FormGroup({
      full_name:  new FormControl(''),
      billing_address:  new FormControl(''),
      city:  new FormControl(''),
      state:  new FormControl(''),
      pincode:   new FormControl(''),
      country:  new FormControl(''),
      emailid:  new FormControl(''),
      phoneno:  new FormControl(''),
      contactno:  new FormControl(''),
      panno:   new FormControl(''),
      GSTin:  new FormControl(''),
      Type:  new FormControl(''),
      openingbalance:   new FormControl(''),
      doctype:  new FormControl(''),
      docno:  new FormControl(''),
      DOB:  new FormControl(''),
      anniversary:  new FormControl(''),
      creditallowed:  new FormControl(''),
      creditlimit:  new FormControl(''),
      remarknote:  new FormControl(''),
      profile_pic:new FormControl(''),
      });
      if(this.route.snapshot.params["id"]==null){
        this.addMode=true;
      }
      if(!this.addMode){
      this.editclient(this.route.snapshot.params["id"]);
      }
    }
    catch(e){
      console.log('client error-ngonit'+e);
      alert('client error-ngonit'+ e);
    }
  }
  numberOnly(event:any): boolean {
    const charCode = event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  keyPressAlpha(event:any){
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z s]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  keyPressAlphanumeric(event:any){
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z 0-9 s]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
 
  selectFile(event: any): void {
    this.message = '';
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

  Saveclient(){
      try{
        if(this.fg_clientdetails.valid){
        const data={
        full_name:  this.fg_clientdetails.controls['full_name'].value,
        billing_address: this.fg_clientdetails.controls['billing_address'].value,
        city:  this.fg_clientdetails.controls['city'].value,
        state: this.fg_clientdetails.controls['state'].value,
        pincode: parseInt(this.fg_clientdetails.controls['pincode'].value),
        country:  this.fg_clientdetails.controls['country'].value,
        emailid: this.fg_clientdetails.controls['emailid'].value,
        phoneno: this.fg_clientdetails.controls['phoneno'].value,
        contactno: this.fg_clientdetails.controls['contactno'].value,
        panno: this.fg_clientdetails.controls['panno'].value,
        GSTin: this.fg_clientdetails.controls['GSTin'].value,
        Type: this.fg_clientdetails.controls['Type'].value,
        openingbalance: parseInt(this.fg_clientdetails.controls['openingbalance'].value),
        doctype: this.fg_clientdetails.controls['doctype'].value,
        docno: this.fg_clientdetails.controls['docno'].value,
        DOB: this.fg_clientdetails.controls['DOB'].value,
        anniversary: this.fg_clientdetails.controls['anniversary'].value,
        creditallowed: this.fg_clientdetails.controls['creditallowed'].value,
        creditlimit:parseInt(this.fg_clientdetails.controls['creditlimit'].value),
        remarknote: this.fg_clientdetails.controls['remarknote'].value,
        profile_pic:this.preview,
        active:true 
       };
       this.honeybillservice.SaveClient(data).subscribe({
        next:(res)=>{
          console.log(res);
          this.addMode = true;
        },
        error:(e)=>console.error(e)
       });
       this.message = 'Client Saved successfully!!';
       }
       setTimeout(() => {
        this.NavigateToClient();
       }, 2000);
      } 
      catch(e){
        console.log('Error in saveclient'+ e);
        alert('Error in saveclient'+ e);
      }
    }
  
    NavigateToClient(){
      this.router.navigate(['/client']);
    }
    Uint8ToString(u8a:any){
      var CHUNK_SZ = 0x8000;
      var c = [];
      for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
      }
      this.image=c.join("");
      console.log(this.image);
      return c.join("");
    }
  
    editclient(id:string):void{
      this.honeybillservice.getClientById(id).subscribe({
      next:(data)=>{
        if(data.profile_pic!=null){
          var bytes =  data.profile_pic;
          var u8 = new Uint8Array(bytes.data);
          this.Uint8ToString(u8);
        }  this.preview=this.image;
        this.clientlist=data;
        this.fg_clientdetails.controls['full_name'].setValue(this.clientlist.full_name);
        this.fg_clientdetails.controls['billing_address'].setValue(this.clientlist.billing_address);
        this.fg_clientdetails.controls['city'].setValue(this.clientlist.city);
        this.fg_clientdetails.controls['state'].setValue(this.clientlist.state);
        this.fg_clientdetails.controls['pincode'].setValue(this.clientlist.pincode);
        this.fg_clientdetails.controls['country'].setValue(this.clientlist.country);
        this.fg_clientdetails.controls['emailid'].setValue(this.clientlist.emailid);
        this.fg_clientdetails.controls['phoneno'].setValue(this.clientlist.phoneno);
        this.fg_clientdetails.controls['contactno'].setValue(this.clientlist.contactno);
        this.fg_clientdetails.controls['panno'].setValue(this.clientlist.panno);
        this.fg_clientdetails.controls['GSTin'].setValue(this.clientlist.GSTin);
        this.fg_clientdetails.controls['Type'].setValue(this.clientlist.Type);
        this.fg_clientdetails.controls['openingbalance'].setValue(this.clientlist.openingbalance);
        this.fg_clientdetails.controls['doctype'].setValue(this.clientlist.doctype);
        this.fg_clientdetails.controls['docno'].setValue(this.clientlist.docno);
        this.fg_clientdetails.controls['DOB'].setValue(this.clientlist.DOB);
        this.fg_clientdetails.controls['anniversary'].setValue(this.clientlist.anniversary);
        this.fg_clientdetails.controls['creditallowed'].setValue(this.clientlist.creditallowed);
        this.fg_clientdetails.controls['creditlimit'].setValue(this.clientlist.creditlimit);
        this.fg_clientdetails.controls['remarknote'].setValue(this.clientlist.remarknote);
        // this.preview=this.image;
        console.log(data);
      },
      error:(e)=>console.error(e)});
    }

   checkCheckBoxvalue(event: { checked: any; },no:any){
      console.log(event.checked);
      console.log(no);
      var a = document.getElementById('date1') as HTMLInputElement;
      var b = document.getElementById('date2') as HTMLInputElement;
      switch(no){
        case 1 :
          if(event.checked==true&&no==1){
            a.disabled=false; 
          }else{
            a.disabled=true;
            a.value="";
          }
        break;
        case 2 :
          if(event.checked==true&&no==2){
            b.disabled=false; 
          }else{
            b.disabled=true;
            b.value="";
          }
        break;
      }
    } 
   UpdateclientByid(){
      try{
        if(this.fg_clientdetails.valid){
          
        this.clientlist.full_name=this.fg_clientdetails.controls['full_name'].value;
        this.clientlist.billing_address=this.fg_clientdetails.controls['billing_address'].value;
        this.clientlist.city=this.fg_clientdetails.controls['city'].value;
        this.clientlist.state=this.fg_clientdetails.controls['state'].value;
        this.clientlist.pincode=this.fg_clientdetails.controls['pincode'].value;
        this.clientlist.country=this.fg_clientdetails.controls['country'].value;
        this.clientlist.emailid=this.fg_clientdetails.controls['emailid'].value;
        this.clientlist.phoneno=this.fg_clientdetails.controls['phoneno'].value;
        this.clientlist.contactno=this.fg_clientdetails.controls['contactno'].value;
        this.clientlist.panno=this.fg_clientdetails.controls['panno'].value;
        this.clientlist.GSTin=this.fg_clientdetails.controls['GSTin'].value;
        this.clientlist.Type=this.fg_clientdetails.controls['Type'].value;
        this.clientlist.openingbalance=this.fg_clientdetails.controls['openingbalance'].value;
        this.clientlist.doctype=this.fg_clientdetails.controls['doctype'].value;
        this.clientlist.DOB=this.fg_clientdetails.controls['DOB'].value;
        this.clientlist.anniversary=this.fg_clientdetails.controls['anniversary'].value;
        this.clientlist.creditallowed=this.fg_clientdetails.controls['creditallowed'].value;
        this.clientlist.creditlimit=this.fg_clientdetails.controls['creditlimit'].value;
        this.clientlist.remarknote=this.fg_clientdetails.controls['remarknote'].value;
        this.clientlist.profile_pic=this.preview;
        this.honeybillservice.UpdateClientList(this.clientlist.id,this.clientlist).subscribe({
          next:(res)=>{
            console.log(res);
            this.addMode=false;
          },
          error:(e)=>console.error(e)
        });
        this.message = 'Client Updated successfully!!';
      }
      setTimeout(() => {
          this.NavigateToClient();
      }, 2000);
        
    }
    catch(e){
      console.log('error in update client information'+e);
      alert('error in update client information'+e);
    }
  }
}

