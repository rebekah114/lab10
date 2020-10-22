var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find({}).populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
   },
   deleteMovieById: function(req,res){
       Movie.findByIdAndDelete({_id:req.params.id},function (err,movie) {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();
        res.json(movie);//loading document????
       });
   },
   deleteActorFromList: function (req,res) {
       Movie.findOne({_id:req.params.mId},function (err, movie) {
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();
       });
       Actor.findByIdAndRemove({_id:req.params.aId},function (req,res) {
        if (err) return res.status(400).json(err);
        res.json();
       })
   }, getMovieYears: function (req, res) { //////////////////////// get movies between year 1 and 2
    let sortBy={year:1}
     Movie.find({}).sort(sortBy).exec(function(err,data){
        if (err) return res.status(400).json(err);
        if (!data) return res.status(404).json();
     });
 }, 
    deleteMovieByYear: function (req, res){//////////////////////////////////////////
    Movie.find({}).where('year').gte(req.params.year2).lte(req.params.year1)
    .populate('movies').exec(function(err,data){
        if (err) return res.status(400).json(err);
        if (!data) return res.status(404).json();
     });
},
addActorsToMovie: function (req, res) {
    console.log(req.body);
    console.log("id",req.params.id);
    Movie.findOne({ _id: req.params.id }, function (err, movie) {//retrieve the movies document where the id can be found in the URL’s params
        if (err) return res.status(400).json(err);
        if (!movie) return res.status(404).json();

        Actor.findOne({ _id: req.body.id }, function (err, actor) {//retrieve the actor where its ID is saved in the ‘req.body’
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            movie.actors.push(actor._id); //pushing the actor into the movies document, we save it back to the database.
            movie.save(function (err) {
                if (err) return res.status(500).json(err);
                res.json(movie);
            });
        })
    });
  }
};



