import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Staff } from 'src/app/models/staff';
import { HoneybillService } from 'src/app/services/honeybill.service';


@Component({
  selector: 'app-addedit-staff',
  templateUrl: './addedit-staff.component.html',
  styleUrls: ['./addedit-staff.component.css']
})
export class AddeditStaffComponent implements OnInit {
  addMode!: boolean;
  fg_staffdetails!:FormGroup;
  isClose!: boolean;
  valueSelected!: string;
  communicationmode = new FormControl();
  communicationmodes: string[] = ['SMS', 'Email'];
 


 stafflist:Staff={
    joining_date: '',
    referred_by: '',
    designation: '',
    department: '',
    fullname: '',
    gender: false,
    address: '',
    email_id: '',
    mobile_no: '',
    DOB: '',
    anniversary_date: '',
    contact_person: '',
    contact_no: '',
    blood_group: '',
    doctype: '',
    docno: '',
    expiryissue_date: '',
    communicationmode: '',
    sales_commission: '',
    remarknote: '',
    active: false,
    id:'',
  }
  mode: any;


  constructor(private honeybillservice:HoneybillService,private route:ActivatedRoute,private router:Router) {}

  
   

  ngOnInit(): void {
    try{
      this.fg_staffdetails=new FormGroup({
        joining_date:new FormControl(''),
        referred_by:new FormControl(''),
        designation:new FormControl(''),
        department:new FormControl(''),
        fullname:new FormControl(''),
        gender:new FormControl(''),
        address:new FormControl(''),
        email_id:new FormControl(''),
        mobile_no:new FormControl(''),
        DOB:new FormControl(''),
        anniversary_date:new FormControl(''),
        contact_person:new FormControl(''),
        contact_no:new FormControl(''),
        blood_group:new FormControl(''),
        doctype:new FormControl(''),
        docno:new FormControl(''),
        expiryissue_date:new FormControl(''),
        communicationmode:new FormControl(''),
        checked: new FormControl(false, []),
        sales_commission:new FormControl(''),
        remarknote:new FormControl(''),
        
      });
  
      if(this.route.snapshot.params["id"]==null){
        this.addMode=true;
      }
      if(!this.addMode){
      this.editstaff(this.route.snapshot.params["id"]);
      }
    }catch(e){
      console.log('staff error-ngonit'+e);
      alert('staff error-ngonit'+ e);
    }
  }

  Savestaff(){
    try{
      if(this.fg_staffdetails.valid){
        const data={
          joining_date:  this.fg_staffdetails.controls['joining_date'].value,
          referred_by:  this.fg_staffdetails.controls['referred_by'].value,
          designation:  this.fg_staffdetails.controls['designation'].value,
          department:  this.fg_staffdetails.controls['department'].value,
          fullname:  this.fg_staffdetails.controls['fullname'].value,
          gender:  this.fg_staffdetails.controls['gender'].value,
          address:  this.fg_staffdetails.controls['address'].value,
          email_id:  this.fg_staffdetails.controls['email_id'].value,
          mobile_no:  this.fg_staffdetails.controls['mobile_no'].value,
          DOB:  this.fg_staffdetails.controls['DOB'].value,
          anniversary_date:  this.fg_staffdetails.controls['anniversary_date'].value,
          contact_person:  this.fg_staffdetails.controls['contact_person'].value,
          contact_no:  this.fg_staffdetails.controls['contact_no'].value,
          blood_group:  this.fg_staffdetails.controls['blood_group'].value,
          doctype:  this.fg_staffdetails.controls['doctype'].value,
          docno:  this.fg_staffdetails.controls['docno'].value,
          expiryissue_date:  this.fg_staffdetails.controls['expiryissue_date'].value,
          communicationmode: this.valueSelected,
          sales_commission:  this.fg_staffdetails.controls['sales_commission'].value,
          remarknote:  this.fg_staffdetails.controls['remarknote'].value,
          active:true
        };
        this.honeybillservice.SaveStaff(data).subscribe({
          next:(res)=>{
            console.log(res);
            this.addMode = true;
          },
          error:(e)=>console.error(e)
         });
        }
        this.NavigateToStaff();
      }
      catch(e){
        console.log('Error in savestaff'+ e);
        alert('Error in savestaff'+ e);
      }
     }
    
     NavigateToStaff(){
      this.router.navigate(['/staff']);
    } 
    editstaff(id:string):void{
      this.honeybillservice.getStaffById(id).subscribe({
       next:(data)=>{
         this.stafflist=data;
         this.mode=this.stafflist.communicationmode.split(',');
         console.log(this.mode);
         this.fg_staffdetails.controls['joining_date'].setValue(this.stafflist.joining_date);
         this.fg_staffdetails.controls['referred_by'].setValue(this.stafflist.referred_by);
         this.fg_staffdetails.controls['designation'].setValue(this.stafflist.designation);
         this.fg_staffdetails.controls['department'].setValue(this.stafflist.department);
         this.fg_staffdetails.controls['fullname'].setValue(this.stafflist.fullname);
         this.fg_staffdetails.controls['gender'].setValue(this.stafflist.gender);
         this.fg_staffdetails.controls['address'].setValue(this.stafflist.address);
         this.fg_staffdetails.controls['email_id'].setValue(this.stafflist.email_id);
         this.fg_staffdetails.controls['mobile_no'].setValue(this.stafflist.mobile_no);
         this.fg_staffdetails.controls['DOB'].setValue(this.stafflist.DOB);
         this.fg_staffdetails.controls['anniversary_date'].setValue(this.stafflist.anniversary_date);
         this.fg_staffdetails.controls['contact_person'].setValue(this.stafflist.contact_person);
         this.fg_staffdetails.controls['contact_no'].setValue(this.stafflist.contact_no);
         this.fg_staffdetails.controls['blood_group'].setValue(this.stafflist.blood_group);
         this.fg_staffdetails.controls['doctype'].setValue(this.stafflist.doctype);
         this.fg_staffdetails.controls['docno'].setValue(this.stafflist.docno);
         this.fg_staffdetails.controls['expiryissue_date'].setValue(this.stafflist.expiryissue_date);
         this.fg_staffdetails.controls['communicationmode'].setValue(this.mode);
         this.fg_staffdetails.controls['sales_commission'].setValue(this.stafflist.sales_commission);
         this.fg_staffdetails.controls['remarknote'].setValue(this.stafflist.remarknote);
         console.log(data);
       },
       error:(e)=>console.error(e)
      });
    }

   
    

    UpdatestaffByid(){
      try{
        if(this.fg_staffdetails.valid){
          this.stafflist.joining_date=this.fg_staffdetails.controls['joining_date'].value;
          this.stafflist.referred_by=this.fg_staffdetails.controls['referred_by'].value;
          this.stafflist.designation=this.fg_staffdetails.controls['designation'].value;
          this.stafflist.department=this.fg_staffdetails.controls['department'].value;
          this.stafflist.fullname=this.fg_staffdetails.controls['fullname'].value;
          this.stafflist.gender=this.fg_staffdetails.controls['gender'].value;
          this.stafflist.address=this.fg_staffdetails.controls['address'].value;
          this.stafflist.email_id=this.fg_staffdetails.controls['email_id'].value;
          this.stafflist.mobile_no=this.fg_staffdetails.controls['mobile_no'].value;
          this.stafflist.DOB=this.fg_staffdetails.controls['DOB'].value;
          this.stafflist.anniversary_date=this.fg_staffdetails.controls['anniversary_date'].value;
          this.stafflist.contact_person=this.fg_staffdetails.controls['contact_person'].value;
          this.stafflist.contact_no=this.fg_staffdetails.controls['contact_no'].value;
          this.stafflist.blood_group=this.fg_staffdetails.controls['blood_group'].value;
          this.stafflist.doctype=this.fg_staffdetails.controls['doctype'].value;
          this.stafflist.docno=this.fg_staffdetails.controls['docno'].value;
          this.stafflist.expiryissue_date=this.fg_staffdetails.controls['expiryissue_date'].value;
          this.stafflist.communicationmode=this.valueSelected;
          this.stafflist.sales_commission=this.fg_staffdetails.controls['sales_commission'].value;
          this.stafflist.remarknote=this.fg_staffdetails.controls['remarknote'].value;
          this.honeybillservice.UpdateStaffList(this.stafflist.id,this.stafflist).subscribe({
            next:(res)=>{
              console.log(res);
              this.addMode=false;
            },
            error:(e)=>console.error(e)
          });
          alert('Staff Updated successfully!! ');
        }
        this.NavigateToStaff();
      }
      catch(e){
        console.log('error in update staff information'+e);
        alert('error in update staff information'+e);
      }
    }
    comboChange(event:any) {
      this.isClose = false;
      if(!event) {
        this.isClose = true;
        console.log('dropdown is closed');
        this.valueSelected =this.communicationmode.value && this.communicationmode.value.toString();
        console.log(this.mode);
      }
      
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










    
   
  }
  
    


