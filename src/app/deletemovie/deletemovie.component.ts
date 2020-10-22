import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-deletemovie',
  templateUrl: './deletemovie.component.html',
  styleUrls: ['./deletemovie.component.css']
})
export class DeletemovieComponent implements OnInit {
  moviesDB: any[] = [];
  //do I need to declare all array items?
  constructor(private dbService: DatabaseService, private router: Router) { }


   //Get all Movies
   onGetMovies() {
    console.log("From on GetMovies");
    return this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  //Delete Actor
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
      this.router.navigate(["/listmovie"]); //make sure all the same
    });
  }


  ngOnInit(): void {
    this.onGetMovies();
  }
  }


