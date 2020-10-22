import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-udpateactor',
  templateUrl: './udpateactor.component.html',
  styleUrls: ['./udpateactor.component.css']
})
export class UdpateactorComponent implements OnInit {
  name: string = "";
  bYear: number = 0;
  actorId: string = "";
  actorsDB: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }
//Get all Actors
onGetActors() {
  console.log("From on GetActors");
  return this.dbService.getActors().subscribe((data: any[]) => {
    this.actorsDB = data;
  });
}
// Update an Actor
onSelectUpdate(item) {
  this.name = item.name;
  this.bYear = item.bYear;
  this.actorId = item._id;
}
onUpdateActor() {
  let obj = { name: this.name, bYear: this.bYear };
  this.dbService.updateActor(this.actorId, obj).subscribe(result => {
    this.onGetActors();
    this.router.navigate(["/listactors"]);
  });
}
  ngOnInit(): void {
    this.onGetActors();
  }

}
