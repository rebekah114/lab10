import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-addactor',
  templateUrl: './addactor.component.html',
  styleUrls: ['./addactor.component.css']
})
export class AddactorComponent implements OnInit {
  name: string = "";
  bYear: number = 0;
  actorId: string = "";
  actorsDB: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }

  onSaveActor() {
    let obj = { name: this.name, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.router.navigate(["/listactors"]); //redeirect component to listactors by injecting router service ^^
    });
  }

  ngOnInit(): void {//<--should this b here?
  }

}
