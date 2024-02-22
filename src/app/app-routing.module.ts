import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { UserListComponent } from "./user-list/user-list.component";
import { AuthGuard } from "./guard/auth.guard";

const routes:Routes=[
    {path:'',component:HomeComponent,canActivate:[AuthGuard]},
    {path:'login',component:LoginComponent},
    {path:'Register',component:RegisterComponent},
    {path:'User List',component:UserListComponent,canActivate:[AuthGuard]},

]
@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})

export class AppRoutingModule{}