var form = document.getElementById('userForm');
var userAPI = 'http://localhost:5000/api/users/'

form.addEventListener('submit', regUser);

function regUser(e) {
    e.preventDefault();

    //get inputs
    var formItems = document.getElementsByClassName('form-control');



    var json = '{';
    for (var i = 0; i < formItems.length; i++) {
        json += '\"' + formItems[i].type + '\": \"' + formItems[i].value + '\"';
        if (i != formItems.length - 1)
            json += ',';
    }
    json += '}';

    var req = new XMLHttpRequest();
    var email = JSON.parse(json).email;
    req.open("GET", userAPI + email, true);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            callback(req.responseText);
            alert('wait');
        }
    };
    req.send();
    req.onerror = function (e) {
        alert('Connection error');
    }
    function callback(res) {
        console.log(JSON.parse(res));
        window.location.href = 'home.html';
    }

}
