import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-addactortomovie',
  templateUrl: './addactortomovie.component.html',
  styleUrls: ['./addactortomovie.component.css']
})
export class AddactortomovieComponent implements OnInit {

  actorsDB:any[]=[];
  moviesDB:any[]=[];
  year=0;
  bYear=0;
  name="";
  title="";
  movieId="";
  actorId="";

 constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.onGetMovies();
    this.onGetActors();
  }

  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  selectActor(actorId){
    this.actorId=actorId._id
    };
    selectMovie(movieId){
    this.movieId=movieId._id;
    };
    
     addActors() { 
        let data = { id:this.actorId }; 
       
        this.dbService.addActorsToMovie(this.movieId,data).subscribe(result => {
          this.onGetMovies();
          this.onGetActors();
    // this.router.navigate(["/listactors"]) ??????
        });
       }

}
