let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    id: {type: String},
    username: {type: String},
    password: {type: String},

}, {versionKey: false} )

let User = mongoose.model('users', userSchema);
module.exports = User;