const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//reservation model import
const Reservation = require('./reservation').schema;


//definition User model
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    reservation: {
        type: Reservation
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('User', UserSchema);