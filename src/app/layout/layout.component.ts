import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  profile = false;
  @Input() adminMode = false;
  getlogindata!: any;
  callone=true;
  constructor(private tokenStorage: TokenStorageService,
    private route: Router,) { }

  ngOnInit(): void {
    this.getlogindata = this.tokenStorage.getUser();
    console.log(this.getlogindata.user_type);
    if (this.getlogindata.user_type == 'Admin') {
      this.adminMode = true;
    }
    else {
      this.adminMode = false;
    }
  }

  triggerClick(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.getElementById('profile') as HTMLElement;
    element.click();
    this.profile = true
  }
  
  //Logout function
  RemoveToken_user(): void {
    this.tokenStorage.signOut();
    this.route.navigate(['']);
  }
  l1(){
    var a=  document.getElementById('app')as HTMLUListElement;
    a.style.display='block';
  }
  l2(){
    var a=  document.getElementById('app')as HTMLUListElement;
    a.style.display='none';
  }
  blocklayout1(){
    // var a=  document.getElementById('hello')as HTMLUListElement;
    // a.style.display='block';
    if(this.callone){
      this.l1();
    }else{
      this.l2();
    }
    this.callone=!this.callone;
  }
  l3(){
    var a=  document.getElementById('prod')as HTMLUListElement;
    a.style.display='block';
  }
  l4(){
    var a=  document.getElementById('prod')as HTMLUListElement;
    a.style.display='none';
  }
  blocklayout2(){
    // var a=  document.getElementById('hello')as HTMLUListElement;
    // a.style.display='block';
    if(this.callone){
      this.l3();
    }else{
      this.l4();
    }
    this.callone=!this.callone;
  }
  l5(){
    var a=  document.getElementById('staff')as HTMLUListElement;
    a.style.display='block';
  }
  l6(){
    var a=  document.getElementById('staff')as HTMLUListElement;
    a.style.display='none';
  }
  blocklayout3(){
    // var a=  document.getElementById('hello')as HTMLUListElement;
    // a.style.display='block';
    if(this.callone){
      this.l5();
    }else{
      this.l6();
    }
    this.callone=!this.callone;
  }
  l7(){
    var a=  document.getElementById('client')as HTMLUListElement;
    a.style.display='block';
  }
  l8(){
    var a=  document.getElementById('client')as HTMLUListElement;
    a.style.display='none';
  }
  blocklayout4(){
    // var a=  document.getElementById('hello')as HTMLUListElement;
    // a.style.display='block';
    if(this.callone){
      this.l7();
    }else{
      this.l8();
    }
    this.callone=!this.callone;
  }
  
}
