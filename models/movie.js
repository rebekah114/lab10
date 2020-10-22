const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    actors: [{// an array of references (i.e. ids) to Actor collection. By doing so, each movie document can reference a set of Actors.
        type: mongoose.Schema.ObjectId,
        ref: 'Actor'
    }]
});
module.exports = mongoose.model('Movie', movieSchema);//model is ‘Movie’, therefore, mongoose will create a collection named ‘movies’.