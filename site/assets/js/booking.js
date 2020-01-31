var form = document.getElementById('userForm');
var userAPI = 'http://localhost:5000/api/users/'
var roomAPI = 'http://localhost:5000/api/rooms/'

form.addEventListener('submit', regUser);

function regUser(e) {
    e.preventDefault();

    //get inputs
    var formItems = document.getElementsByClassName('form-control');
    var beginDate = new Date(formItems[0].value);
    var endDate = new Date(formItems[1].value);
    var inEmail = formItems[2].value;

    let room = {
        reservation:{
            roomID: null,
            userID: null,
            basePrice: 50,
            rate: 1,
            paid: true,
            typeOfReservation: "conventional",
            beginDate: beginDate,
            endDate: endDate,
        }
}

if (inEmail == null) {
    alert('email needed');
}
else {
    var json = '{';
    for (var i = 0; i < formItems.length; i++) {
        json += '\"' + formItems[i].name + '\": \"' + formItems[i].value + '\"';
        if (i != formItems.length - 1)
            json += ',';
    }
    json += '}';
    let room = {
        currentlyOccupied: true,
        reservation: {
            roomID: null,
            userID: null,
            basePrice: 50,
            rate: 1,
            paid: true,
            typeOfReservation: "conventional",
            beginDate: beginDate,
            endDate: endDate
        }
    }
    json2=JSON.stringify(room);
    var req = new XMLHttpRequest();
    req.open("POST", roomAPI + inEmail, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            console.log(JSON.parse(req.responseText));
            alert('wait');
            window.location.href = 'confirm.html';
        }
    };
    req.send(json2);
    req.onerror = function (e) {
        alert('Connection error');
    }
}
}
