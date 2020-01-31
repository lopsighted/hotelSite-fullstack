const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const users = require('./Routes/api/users');
const rooms = require('./Routes/api/rooms');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const passport=require('passport')
const roomsAPI = 'http://localhost:5000/api/rooms';
const app = express();


//middleware body parser
app.use(bodyParser.json());

//DB Condfig
const db = require('./Keys/keys').mongoURI;

//connect to mongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//set static folder
app.use(express.static(path.join(__dirname, 'site')));

//READ
app.use('/api/users', users);
app.use('/api/rooms', rooms);
initRooms(roomsAPI);

//passport stuff
require('./passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

function initRooms(api) {
    initialize = function (url, callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                return callback(JSON.parse(request.responseText)); // Another callback here
            }
        };
        request.open('GET', url);
        request.send();
    }

    function mycallback(roomResponse) {
        if (roomResponse != null) {
            if (roomResponse.length < 45) {
                for (var i = roomResponse.length; i < 45; i++) {
                    console.log('New Room created: \n' + postRoom(api));
                }
            }
            else if (roomResponse.length > 45) {
                for (var i = roomResponse.length; i > 45; i--)
                    console.log('Room deleted: ' + deleteRoom(api + '/' + roomResponse[i - 1]._id));
            }

            function postRoom(api) {
                var req = new XMLHttpRequest();
                req.open("POST", api, true);
                req.setRequestHeader("Content-Type", "application/json");
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200)
                        return (JSON.parse(req.responseText));
                };
                req.send(null);
            }

            function deleteRoom(api) {
                var req = new XMLHttpRequest();
                req.open("DELETE", api, true);
                req.onreadystatechange = function () {
                    if (req.readyState == 4 && req.status == 200)
                        return (JSON.parse(req.responseText));
                };
                req.send(null);
            }
        }
        console.log('room check complete\n');
    }
    initialize(api, mycallback);
}
