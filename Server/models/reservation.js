const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//definition Reservation model
const ReservationSchema = new Schema({
    roomID: {
        type: String,
        default: null
    },
    userID: {
        type: String,
        default: null
    },
    basePrice: {
        type: Number,
        default: null
    },
    rate: {
        type: Number,
        default: 1
    },
    paid: {
        type: Boolean,
        default: false
    },
    typeOfReservation: {
        type: String,
        default: 'conventional'
    },
    beginDate: {
        type: String,
        default: new Date(),
    },
    endDate: {
        type: String,
        default: null
    }
});

module.exports = Reservation = mongoose.model('Reservation', ReservationSchema);