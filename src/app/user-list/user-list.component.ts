import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig,MatDialogRef } from '@angular/material/dialog';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public userList:any;
  public dataSource:any;
  public displayedColumns:any=['username','name','email','role','active','action']
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;
  roleList: Object;
  constructor(private service :AuthService,private toastr : ToastrService,private router :Router,
    private spinner :NgxSpinnerService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.GetAllData();
  }
  GetAllData(){
    this.service.GetAll().subscribe(x =>{
      this.userList=x;
      this.dataSource=new MatTableDataSource(this.userList);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }
  UpdateUser(code:any){
          let config = new MatDialogConfig();
          config.width='50%';
          config.data={roleID:code};
        let popup= this.dialog.open(UpdatePopupComponent,  config)

         popup.afterClosed().subscribe(res=>{
          this.GetAllData();
         })
  }


  

}
