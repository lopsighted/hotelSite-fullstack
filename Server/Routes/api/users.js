const express = require('express');
const router = express.Router();
const cors = require('cors');
const passport = require('passport');
const bcrypt = require('bcryptjs');
//user and reservation model import
const Users = require('../../models/user');
const Reservation = require('../../models/reservation');

router.use(cors());
//@route GET api/users
//@desc gets all users
//@access public
router.get('/', (req, res) => {
    Users.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
});

//@route GET api/users
//@desc gets user by email
//@access public
router.get('/:email', (req, res) => {
    Users.find(res.json.email)
        .then(users => res.json(users))
});


//@route POST api/users
//@desc creates a user
//@access public
router.post('/', (req, res) => {
    const email = req.body.email, password = req.body.password;
    Users.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json({ msg: email + ' already exists' });
            }
            else {
                const newUser = new Users({
                    email,
                    password,
                    reservation: new Reservation()
                });
                console.log(newUser.email);
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            console.log(err);
                        }
                        newUser.password = hash;
                        newUser.save()
                            .then(res.json({ msg: 'successful registration' }))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

//@route DELETE api/users
//@desc deletes a user
//@access public
router.delete('/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});
//make delete all function

//update user 
router.post('/:email', (req, res) => {
    Users.findOne({ email: req.params.email })
        .then(user => {
            if (user) {
                let user = {};
                user.reservation.roomID = req.body.reservation.roomID;
                user.reservation.userID = req.body.reservation.userID;
                user.reservation.rate = req.body.reservation.rate;
                user.reservation.paid = req.body.reservation.paid;
                user.reservation.typeOfReservation = req.body.reservation.typeOfReservation;
                user.reservation.beginDate = req.body.reservation.beginDate;
                user.reservation.endDate = req.body.reservation.endDate;
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;

                let query = { _id: req.params.email };

                Users.update(query, user, function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    else {
                        res.redirect('/home.html');
                    }
                })
            }
            else {
                res.json({ msg: 'no user found' });
            }
        });

});

//login (find user)
router.get('/:email', (req, res, next) => {
    Users.findOne({ email: req.params.email })
        .then(user => {
            if (user)
                res.json({ msg: 'founduser' });
            else {
                res.json({msg:'not found'})
            }
        })
});

module.exports = router;