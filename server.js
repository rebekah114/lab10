//Develop an application that represents a library for Movies.  You have to be able to add, update, retrieve, and delete data.
// - Each movie has:
// - id
// - title
// - year
// - list of actors
// Each actor has:
// - id
// - name
// - birth year
// - list of movies
//Each movie may have one or more actors, and each actor may have participated in multiple movies.  In this case, you have many movies related to many actors (many to many relationships).
//The server has to respond with status codes:
// - 400 if an error occurs
// - 404 if no document can be found
// - 200 (which is the default) if the request is processed successfully
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

//References to the routers:
const actors = require('./routers/actor');
const movies = require('./routers/movie');

const path=require('path');
//Create an app from Expressjs and configure it
const app = express();
app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", express.static(path.join(__dirname, "dist/wk10")));

//Ask mongoose to connect to a database named ‘movies’ :
mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});

//Create the RESTFul endpoints.
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll); //If a GET request arrives with pathname =’/actors’, execute actor.getAll
app.post('/actors', actors.createOne);//If a POST request arrives with pathname =’/actors’, execute actor.createOne
app.get('/actors/:id', actors.getOne);//If a GET request arrives with pathname =’/actors/:id’, where id is the ID of the actor, execute actor.getOne
app.put('/actors/:id', actors.updateOne);//If a PUT request arrives with pathname =’/actors/:id’, where id is the ID of the actor,  execute actor.updateOne
app.post('/actors/:actorId/movies/:movieId', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);//if a DELETE request arrives with pathname =’/actors/:id’, where id is the ID of the actor,  execute actor.deleteOne
app.delete('/actors/:aId/:mId',actors.deleteMovieFromList);
app.delete('/actors/:aId',actors.deleteActorAndMovies);
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id',movies.deleteMovieById);
app.delete('/movies/:mId/:aId',movies.deleteActorFromList);
//app.put('/addactor/:aid/movies/:mId',movies.addExistActorToMovie);
app.get('/getmovieyears', movies.getMovieYears);
app.delete('/movies/:year1/:year2',movies.deleteMovieByYear);
app.post('/movies/:id/actors', movies.addActorsToMovie);
//app.put()

//app.get('/actorsage', getActorsByAge);