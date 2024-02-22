import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http:HttpClient) { }
  apiurl=' http://localhost:3000/user';
  roleurl='http://localhost:3000/role'
  
  GetAll(){
    return this.http.get(this.apiurl);
  }
  GetByCode(Code:any){
    return this.http.get(this.apiurl + '/' + Code);
  }

  proceedRegister(input:any){
    return this.http.post(this.apiurl,input);
  }

  UpdateRegister(code:any,input :any){
    return this.http.put(this.apiurl + '/' + code,input); 
  }

  IsLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }

  GetUSerRole(){
    return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString():'';
  }

  GetAllRole(){
    return this.http.get(this.roleurl);
  }
  UpdateForm(code:any,input :any){
    return this.http.put(this.apiurl + '/' + code,input); 
  }
  GetRoleById(roleId:any){
    return this.http.get(this.roleurl+ '/' + roleId)
  }

}
