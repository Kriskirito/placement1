import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private builder :FormBuilder,public toastr :ToastrService, public service:AuthService,public route:Router ,public spinner :NgxSpinnerService) { 
    sessionStorage.clear();
  }

  ngOnInit(): void {
  }

  registerform:FormGroup=this.builder.group({
    id: this.builder.control('',Validators.compose([Validators.required,Validators.minLength(3)])),
    name:this.builder.control('',Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
    gender:this.builder.control(''),
    role:this.builder.control(''),
    isActive:this.builder.control(false),
  })

  

  public proceedregistration(){   
    if(this.registerform.valid){
        this.service.proceedRegister(this.registerform.value).subscribe(res =>{ 
            this.toastr.success('Registration Successfull','Please Contact admin for Further details');
            return this.route.navigate(['login']);
        });
    }else{
      this.toastr.warning('Enter the Valid data');
    }
  }

  public login(){
    this.spinner.show();
    setTimeout(() => {
    this.spinner.hide();
    this.route.navigate(['login']);
  }, 1000);
  }
}
