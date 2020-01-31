const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Reservation = require('./reservation').schema;

//definition room model
const RoomSchema = new Schema({
    reservation: {
        type: Reservation,
        required: false
    },
    currentlyOccupied: {
        type: Boolean,
        default: false
    }
});

module.exports = Room = mongoose.model('Room', RoomSchema);