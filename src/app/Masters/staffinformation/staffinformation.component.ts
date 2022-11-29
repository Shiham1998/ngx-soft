import { Component, OnInit } from '@angular/core';
import { Staff } from 'src/app/models/staff';
import { HoneybillService } from 'src/app/services/honeybill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staffinformation',
  templateUrl: './staffinformation.component.html',
  styleUrls: ['./staffinformation.component.css']
})
export class StaffinformationComponent implements OnInit {
  loading!:boolean;
  stafflistdata:Staff[]=[];
  getstaffId_!:any;

  constructor(private honeybillservice:HoneybillService,private router:Router) { }

  ngOnInit(): void {
    this.getStaffList();
  }
  Passid= (data: any) => {
    this.getstaffId_ = Object.assign(data);
    console.log(this.getstaffId_);
   }
   getStaffList(){
    try{
      this.loading=true;
      setTimeout(async()=>{
        (await this.honeybillservice.getStaffList()).subscribe((stafflist:Staff[])=>{
          this.stafflistdata=[];
          this.stafflistdata=stafflist;
          console.log(this.stafflistdata);
          this.loading=false;
        })
      },100)
    }
    catch(e){
      console.log('Error in getStaffList'+ e);
    }
  }
  deletestaff(id:string){
    try {
      this.honeybillservice.deleteStaffList(id)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
      this.NavigateToList();
    } catch (e) {
     console.log('error in delete client'+e);
    }
  }
  NavigateToList() {
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {
    skipLocationChange: true,
    replaceUrl: true
  }).then(() => {
    this.router.navigate([currentUrl]);
  });
 }
}
