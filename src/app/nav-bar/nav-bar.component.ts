import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { promise } from 'protractor';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit ,DoCheck{
  constructor(private spinner : NgxSpinnerService,private router: Router) { }
  public authMenus : any;
  public pageLink=['','login','Register','User List'];
  public pageName=['Home','login','Register','User List']
  public menus :boolean;
  ngOnInit(
  ): void {
    this.loadData();
   
  }

  ngDoCheck(): void {
    let currentUrl=this.router.url;
    if(currentUrl =='/login' || currentUrl=='/Register'){
      this.menus=false;
      this.authMenus=this.pageName.filter(x => x !='Home' && x!='User List')
    }else{
      this.menus=true;
      this.authMenus=this.pageName.filter(x => x !='login' && x !='Register')
    }
  }

  async getNavData(value?:string){
    if(value != null){
      let Link :any=value =='Home'?'':value;
      await this.loadData();
      return this.router.navigate([Link]);
    }
  }

loadData(){
  return new Promise<void>((resolve,reject)=>{
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      resolve();
    }, 1000);
  })
  }

  logout(){
    this.router.navigate(['login']);
    this.menus=false;
  }


}
