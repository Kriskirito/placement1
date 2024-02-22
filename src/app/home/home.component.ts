import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public username=sessionStorage.getItem('username');
  public Userlist:any;
  constructor(private router : Router,private service :AuthService) { 
  }

  ngOnInit(): void {
  this.getName();
    
  }
  getName(){
    this.service.GetByCode(this.username).subscribe(res =>{
      this.Userlist=res;
    })
  }
}
