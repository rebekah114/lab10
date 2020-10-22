const mongoose = require('mongoose');//allow schema to access mongoose lib


const actorSchema = new mongoose.Schema({//create new schema
    _id: mongoose.Schema.Types.ObjectId,
    name: { //name is mandatory field of type string
        type: String,
        required: true
    },
    bYear: {
        validate: {
            validator: function (newAge) {//mandatory field type int, validator is a boolean function that returns true if the birth year is integer and false otherwise.
                if (Number.isInteger(newAge))
                    return true;
                else return false
            },
            message: 'Birth year should be integer'
        },
        type: Number,
        required: true
    },
    movies: [{ //defines the list of movies, which is an array of references (i.e. ids) to ‘Movie’ collection
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    }]
});
//simpler way of coding the bYear
// bYear: {
//     validate: {
//         validator: Number.isInteger,
//         message: 'Birth year should be integer'
//     },
//     type: Number,
//     required: true
// }
module.exports = mongoose.model('Actor', actorSchema);//export model, name of the model is ‘Actor’, therefore, mongoose will create a collection named ‘actors’.