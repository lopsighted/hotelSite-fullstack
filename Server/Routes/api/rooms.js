const express = require('express');
const router = express.Router();
const cors = require('cors');

//tempRoom and reservation model import
const Room = require('../../models/room');
const Users = require('../../models/user');
const Reservation = require('../../models/reservation');

router.use(cors());

//@route GET api/Room
//@desc gets all Rooms
//@access public
router.get('/', (req, res) => {
    Room.find()
        .sort({ currentlyOccupied: -1 })
        .then(rooms => res.json(rooms))
});

//@route POST api/rooms
//@desc creates a tempRoom
//@access public
//use ONLY to instantiate 45 rooms
router.post('/', (req, res) => {
    const newRoom = new Room({
        Reservation: new Reservation(),
    });
    newRoom.save().then(tempRoom => res.json(tempRoom));

});

//@route DELETE api/rooms
//@desc deletes a tempRoom
//@access public
router.delete('/:id', (req, res) => {
    Room.findById(req.params.id)
        .then(tempRoom => tempRoom.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

//update tempRoom
router.post('/:email', (req, res) => {
    var tempReservation = {
        roomID: req.body._id,
        userID: req.body.reservation.userID,
        rate: req.body.reservation.rate,
        paid: req.body.reservation.paid,
        typeOfReservation: req.body.reservation.typeOfReservation,
        beginDate: req.body.reservation.beginDate,
        endDate: req.body.reservation.endDate
    }
    var tempRoom = {
        reservation: tempReservation,
        currentlyOccupied: req.body.currentlyOccupied
    };
    var tempUser = {};

    let query = { email: req.params.email };

    Users.findOne(query, user => {
        if (user) {
            tempReservation.userID = user._id;
            console.log(user._id);
            Room.findOne({ currentlyOccupied: false }, room => {
                if (room) {
                    tempReservation.roomID = room._id;
                    tempRoom.currentlyOccupied = false;
                }
            })
            user.reservation = tempReservation;
            tempUser = user;
        }
        else {
            res.json({ msg: 'no user found' });
        }
    })
    Room.updateOne(query, tempRoom, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            console.log('update room')
        }
    });
    Users.updateOne(query, tempUser, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            console.log('update user')
        }
    });
});

module.exports = router;