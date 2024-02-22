import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent implements OnInit {
  public UserList:any;
  public ans:any;
  public editedValue:any;
  constructor(private builder :FormBuilder,public toastr :ToastrService, public service:AuthService,public route:Router ,public spinner :NgxSpinnerService
    ,@Inject(MAT_DIALOG_DATA) public data: any
    , public dialog: MatDialog,private ref:MatDialogRef<UpdatePopupComponent>) { 
      this.ans=data;
  }

  ngOnInit(): void {
    this.GetAllUserRoll();
    if(this.data.roleID !=null && this.data.roleID !=''){
      this.service.GetByCode(this.data.roleID ).subscribe(res=>{
        this.editedValue=res;
        this.Updateform.setValue({id:this.editedValue.id,
          name:this.editedValue.name,password:this.editedValue.password
        ,email:this.editedValue.email,gender:this.editedValue.gender,role:this.editedValue.role,isActive:this.editedValue.isActive})
      })
    }
  }
 
    Updateform:FormGroup=this.builder.group({
    id: this.builder.control(''),
    name:this.builder.control(''),
    password: this.builder.control(''),
    email:this.builder.control(''),
    gender:this.builder.control('male'),
    role:this.builder.control(''),
    isActive:this.builder.control(false),
  })
  UpdateUser(){
    if(this.Updateform.valid){
      let popup=this.service.UpdateForm(this.Updateform.value.id,this.Updateform.value)
      .subscribe(res=>{
        this.toastr.success("The User Data Updated Successfully");
        this.ref.close();
      })
    }else{
      this.toastr.warning('Please Select Valid Data','If Issue Persist Plz Contact Admin! ');
    }
  }

  GetAllUserRoll(){
    this.service.GetAllRole().subscribe(res =>{
      this.UserList=res;
    })
  }
}
