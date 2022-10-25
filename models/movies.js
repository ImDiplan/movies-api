let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let movieSchema = new Schema({
    id: {type: String},
    title: {type: String},
    overview: {type: String},
    poster: {type: String},
    video: {type: String},
    actors: {type: String},
    director: {type: String},
    rate: {type: String},
    year: {type: String},
    backdrop_path: {type: String}

}, {versionKey: false} );

let Movie = mongoose.model('movies', movieSchema);
module.exports = Movie;
