var request = new XMLHttpRequest()

request.open('GET', 'http://localhost:5000/api/users', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    data.forEach(user => {
      console.log(user.id)
    })
  } else {
    console.log('error')
  }
}

request.send()