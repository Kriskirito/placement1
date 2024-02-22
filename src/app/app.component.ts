import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'placement1';
  public menus :any;
  public pageName:any;
  public pagesName=['Home','login','Register','User List']
  constructor(private router: Router,private toastr :ToastrService){
  }

  
}
