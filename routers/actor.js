//In this file, all the operation of the ‘Actor’ collection will be implemented.

//Router needs access to both models (Actor and Movie) and to the Mongoose library.
const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
const { move } = require('../server');

//due to having more than one function to be exported, the router will export an object where each function is a member (property) of that object.
module.exports = {
    //function that retrieves all the documents from the Actor collection and sends them back as a response.
    getAll: function (req, res) { //use populate WHERE DO I PUT .POPULATE???????????????????????
        Actor.find({}).populate('movies').exec(function(err,actors){
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);//res.json() function sends the response in a JSON format
                 }
        })
    },
    //function that creates a new document based on the parsed data in ‘req.body’ and saves it in ‘Actor’ collection.
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    //function finds one document by an ID
    //.populate replaces each ID in the array ‘movies’ with its document.
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    //finds a document by its ID and sets new content that is retrieved from ‘req.body’
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    //deletes the document that matches the criteria.
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    //adds  movies to list of movies in an actors document.????????????
    addMovie: function (req, res) {
        Actor.findOne({ id: req.params.id }, function (err, movie) {//retrieve the movies document where the name can be found in the URL’s params
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            Movie.findOne({ name: req.body.name }, function (err, actor) {//retrieve the movie where its name is saved in the ‘req.body’
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id); //pushing the movie into the actors document, we save it back to the database.
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },

    //delete an actor and all it's movies
    deleteActorAndMovies:function (req,res) {
        Actor.findOne({_id:req.params.aId},function (req,res) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

        Movie.deleteMany({_id:req.body.id},function (err,movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
        })
            
        })
    },
    //Remove an actor from the list of actors in a movie
    deleteMovieFromList: function (req,res) {
        Actor.findOne({_id:req.params.aId},function (err, movie) {
         if (err) return res.status(400).json(err);
         if (!movie) return res.status(404).json();
        });
        Movie.findByIdAndRemove({_id:req.params.mId},function (req,res) {
         if (err) return res.status(400).json(err);
         res.json();
        })
      }//,
    // getActorsByAge:  function (req, res) { 
    //     Actor.find({ bYear: req.query},(function(err,actors){
    //         if (err) {
    //             return res.status(404).json(err);
    //         } else {
    //             res.json(actors);//res.json() function sends the response in a JSON format
    //              }
    //     }))
    // }
 };




//another way to insert a new document into a collection by using ‘Model.create’ function:
// createOne: function (req, res) {
//     let newActorDetails = req.body;
//     newActorDetails._id = new mongoose.Types.ObjectId();
//     Actor.create(newActorDetails, function (err, actor) {
//         if (err)
//             return res.json(err);
//         res.json(actor);
//     });
// },
