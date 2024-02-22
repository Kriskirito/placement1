import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public route :Router,public toast:ToastrService,public build:FormBuilder,private service : AuthService,private spinner :NgxSpinnerService) { 
    sessionStorage.clear();
  }
  public userdata:any;
  ngOnInit(): void {

  }

  loginform:FormGroup=this.build.group({
    username:this.build.control('',Validators.required),
    password:this.build.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]))
  })

  proceedlogin(){
    if(this.loginform.valid){
      this.service.GetByCode(this.loginform.value.username).subscribe(res =>{
        this.userdata=res;
       if(this.userdata.password ==this.loginform.value.password){
          if(this.userdata.isActive){
              sessionStorage.setItem('username',this.userdata.id);
              sessionStorage.setItem('userrole',this.userdata.role);
              this.route.navigate(['']);
          }
          else{
            this.toast.error('Not a Valid User','PLease Contact Admin!')
          }
       }
       else{
          this.toast.error('Invalid Credentials','PLease Enter Valid Password')
       }
      })
    }else{
      this.toast.warning("User Name and Password Not Correct","Enter Valid Data");
    }
  }
  BackToRegister(){
  this.spinner.show();
    setTimeout(() => {
    this.spinner.hide();
    this.route.navigate(['Register']);
  }, 1000);
  }

}
