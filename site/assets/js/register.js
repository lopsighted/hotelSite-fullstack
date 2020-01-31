var form = document.getElementById('userForm');
var userAPI = 'http://localhost:5000/api/users'

form.addEventListener('submit', regUser);

function regUser(e) {
    e.preventDefault();

    //get inputs
    var formItems = document.getElementsByClassName('form-control');

    if (formItems.namedItem('password').value != formItems.namedItem('password-repeat').value)
        alert('Passwords dont match');
    else {
        var json = '{';
        for (var i = 0; i < formItems.length; i++) {
            json += '\"' + formItems[i].type + '\": \"' + formItems[i].value + '\"';
            if (i != formItems.length - 1)
                json += ',';
        }
        json += '}';

        var req = new XMLHttpRequest();
        req.open("POST", userAPI, true);
        req.setRequestHeader("Content-Type", "application/json");
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                console.log(JSON.parse(req.responseText));
                alert('successfully registered');
                window.location.href = 'home.html';

            }
        };
        req.send(json);
        req.onerror = function (e) {
            alert('Connection error');
        }
    }
}
