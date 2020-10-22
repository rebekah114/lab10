import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListactorsComponent } from './listactors/listactors.component';
import { AddactorComponent } from './addactor/addactor.component';
import { UdpateactorComponent } from './udpateactor/udpateactor.component';
import { DeleteactorComponent } from './deleteactor/deleteactor.component';

import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { ListmovieComponent } from './listmovie/listmovie.component';
import { AddactortomovieComponent } from './addactortomovie/addactortomovie.component';//fix

import {DatabaseService} from "./database.service";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { HttpClientModule, HttpHeaders } from "@angular/common/http";//???

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const appRoutes: Routes = [ //seperate from backend only front end //has 2 attributes, path is a target that when it is clicked (a button) that is linked to path it will return/direct to a component //udpate
  { path: "listactors", component: ListactorsComponent },
  { path: "addactor", component: AddactorComponent },
  { path: "udpateactor", component: UdpateactorComponent },
  { path: "deleteactor", component: DeleteactorComponent },
  { path: "", redirectTo: "/listactors", pathMatch: "full" }, //listmovie,deletemovie,addmovie NO s, do i need to add path <<<
  { path: "deletemovie", component: DeletemovieComponent },
  { path: "addmovie", component: AddmovieComponent },
  { path: "listmovie", component: ListmovieComponent },
  { path: "addactortomovie", component: AddactortomovieComponent },
  { path: "", redirectTo: "/listmovie", pathMatch: "full" },
  { path: '**', component: PagenotfoundComponent }, 
  
];

@NgModule({
  declarations: [
    AppComponent,
    ListactorsComponent,
    AddactorComponent,
    UdpateactorComponent,
    DeleteactorComponent,
    ListmovieComponent,
    AddmovieComponent,
    DeletemovieComponent,
    AddactortomovieComponent,
    PagenotfoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes,{useHash:true}),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
